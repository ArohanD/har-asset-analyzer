import fs from "fs";

export const pathFinder = async (url: string) => {
  const urlObj = new URL(url);

  const saveDirectory = extractDirectory(urlObj.hostname);

  try {
    const urlPathExists = urlObj.pathname !== "" && urlObj.pathname !== "/";
    if (fs.existsSync(`data/${saveDirectory}`)) {
      if (urlPathExists) {
        const savePath = `data/${saveDirectory}/${replaceSlashes(
          urlObj.pathname
        )}`;
        if (await !fs.existsSync(savePath)) {
          await fs.mkdirSync(savePath);
        }
      } else {
        await fs.mkdirSync(`data/${saveDirectory}/__`);
      }
    } else {
      await fs.mkdirSync(`data/${saveDirectory}`);
      if (urlPathExists) {
        await fs.mkdirSync(
          `data/${saveDirectory}/${replaceSlashes(urlObj.pathname)}`
        );
      } else {
        await fs.mkdirSync(`data/${saveDirectory}/__`);
      }
    }
  } catch (e) {
    console.error(e);
  }

  return `data/${saveDirectory}/${replaceSlashes(urlObj.pathname)}`;
};

const extractDirectory = (host: string) => {
  const urlArray = host.split(".");
  return urlArray[0] === "www" ? urlArray[1] : urlArray[0];
};

const replaceSlashes = (path: string) => {
  return path.split("/").join("__");
};
