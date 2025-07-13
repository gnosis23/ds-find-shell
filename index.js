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

// 调用 DeepSeek API 总结工作
async function summarizeWithDeepSeek(commits) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error('Please set environment variable DEEPSEEK_API_KEY');
    return;
  }

  // 构建 commit messages 文本
  const commitMessages = commits.map(commit =>
    `${commit.date}: ${commit.message}`
  ).join('\n');

  const prompt = `Please summarize the work based on the following git commit records:

    ${commitMessages}

    请用中文总结：
    1. 主要完成的功能和改进
    2. 涉及的技术栈和工具
    3. 工作量和时间分布

    请提供简洁而全面的总结。`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;

    console.log('\n=== Summary ===\n');
    console.log(summary);

  } catch (error) {
    console.error('Call DeepSeek API failed:', error.message);
  }
}

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
      return;
    }

    console.log(`Found ${commits.length} commits`);

    // 显示所有 commit messages
    console.log('\n=== Commit messages ===');
    for (const commit of commits) {
      console.log(`${commit.date}: ${commit.message}`);
    }

    // 调用 DeepSeek API 总结工作
    await summarizeWithDeepSeek(commits);
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
