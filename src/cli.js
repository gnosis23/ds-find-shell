import process from 'process';
import { exec } from 'child_process';
import { createInterface } from 'readline';

// 简单的确认函数
function askConfirmation(question) {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question + ' (y/n): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// 调用 DeepSeek API 总结工作
async function translateWithDeepSeek(description) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error('Please set environment variable DEEPSEEK_API_KEY');
    return;
  }

  const prompt = `Please translate the following description into shell script:

    ${description}

    Requirement:
    - 请以纯文本格式返回代码，不要包含任何解释
    - 请确保代码可以正常运行
    - 最好是一行代码
    - 不要包含markdown格式
    - 不要包含shebang
  `;

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
        response_format: { type: 'text' }
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const shellScript = data.choices[0].message.content;

    console.log(`> ${shellScript}`);

    // ask user whether to execute the shell script
    const execute = await askConfirmation('Do you want to execute the shell script?');

    if (execute) {
      exec(shellScript, (error, stdout, stderr) => {
        if (error) {
          console.error(`> Error: ${error.message}`);
        }
        if (stderr) {
          console.error(`> Stderr: ${stderr}`);
        }
        if (stdout) {
          console.log(`> ${stdout}`);
        }
      });
    }

  } catch (error) {
    console.error('Call DeepSeek API failed:', error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);

  // 验证参数数量
  if (args.length < 1) {
    console.log('Usage: ds-find-shell <description>');
    process.exit(1);
  }

  const description = args[0];
  await translateWithDeepSeek(description);
}

// 运行主函数
try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
