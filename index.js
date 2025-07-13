import process from 'process';
import simpleGit from 'simple-git';
import { z } from 'zod';

// 定义日期格式的 zod schema
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "date format must be YYYY-MM-DD, eg: 2025-01-01"
});

// 定义参数的 zod schema
const argsSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return start <= end;
}, {
  message: "start date must be before or equal to end date"
});

async function main() {
  const args = process.argv.slice(2);
  
  // 验证参数数量
  if (args.length < 2) {
    console.log('Usage: git-summary 2025-01-01 2025-07-13');
    process.exit(1);
  }

  // 使用 zod 验证参数
  try {
    const validatedArgs = argsSchema.parse({
      startDate: args[0],
      endDate: args[1]
    });
    
    const { startDate, endDate } = validatedArgs;
    
    const git = simpleGit();
    let commits = await git.log({
      '--since': startDate,
    });

    commits = commits.all.filter((commit) => {
      return commit.date >= startDate && commit.date <= endDate;
    });

    if (commits.length === 0) {
      console.log('No commits found');
    }

    for (const commit of commits) {
      console.log(commit.date, ':', commit.message);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid arguments:');
      // print zod error
      const pretty = z.prettifyError(error);
      console.error(pretty);
      process.exit(1);
    }
    throw error;
  }
}

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
