import fs from "fs";
import wdioParallel from "./index";
const sourceSpecDirectory = `./features/**`;
const parallelExecutionReportDirectory = `${process.cwd()}/reports`;

(async () => {
  const tmpSpecDirectory = `./.generatedScenarios`;
  wdioParallel.performSetup({
    sourceSpecDirectory: sourceSpecDirectory,
    tmpSpecDirectory: tmpSpecDirectory,
    cleanTmpSpecDirectory: true,
  });

  if (fs.existsSync(parallelExecutionReportDirectory)) {
    fs.rmSync(parallelExecutionReportDirectory, {
      recursive: true,
      force: true,
    });
  }
  fs.mkdirSync(parallelExecutionReportDirectory);
})();
