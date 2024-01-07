This repository contains code needed to reproduce issue with debugging ts-jest files with inline source maps.

As a result of this issue, debuggerd like Chrome debugger do not display properly code.

Source maps generated with ts-jest contain content like:

```
{"file":"/home/sobanieca/code/ts-jest/test.ts","mappings":"AAIA,MAAM,MAAM,GAAW,EAAE,IAAI,EAAE,GAAG,EAAE,CAAA;AAGpC,QAAQ,CAAC,QAAQ,EAAE,GAAG,EAAE;IACvB,EAAE,CAAC,kBAAkB,EAAE,GAAG,EAAE;QAC1B,QAAQ,CAAC;QACT,MAAM,CAAC,MAAM,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC;IAChC,CAAC,CAAC,CAAC;AACJ,CAAC,CAAC,CAAC","names":[],"sources":["/home/sobanieca/code/ts-jest/test.ts"],"sourcesContent":["type Animal = {\n name: string;\n}\n\nconst animal: Animal = { name: 'a' }\n\n\ndescribe('animal', () => {\n it('should have name', () => {\n   debugger;\n   expect(animal.name).toBe('b');\n });\n});\n"],"version":3}
```

while source maps for `tsexpress-sample` (using `ts-node` directly) contain following:

```
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;;;AAAA,sDAA8D;AAE9D,MAAM,GAAG,GAAY,IAAA,iBAAO,GAAE,CAAC;AAC/B,MAAM,IAAI,GAAG,OAAO,CAAC,GAAG,CAAC,IAAI,IAAI,IAAI,CAAC;AAEtC,GAAG,CAAC,GAAG,CAAC,GAAG,EAAE,CAAC,GAAY,EAAE,GAAa,EAAE,EAAE;IAC3C,QAAQ,CAAC;IACT,GAAG,CAAC,IAAI,CAAC,6BAA6B,CAAC,CAAC;AAC1C,CAAC,CAAC,CAAC;AAEH,GAAG,CAAC,MAAM,CAAC,IAAI,EAAE,GAAG,EAAE;IACpB,OAAO,CAAC,GAAG,CAAC,mDAAmD,IAAI,EAAE,CAAC,CAAC;AACzE,CAAC,CAAC,CAAC","sourcesContent":["import express, { Express, Request, Response } from \"express\";\n\nconst app: Express = express();\nconst port = process.env.PORT || 3000;\n\napp.get(\"/\", (req: Request, res: Response) => {\n  debugger;\n  res.send(\"Express + TypeScript Server\");\n});\n\napp.listen(port, () => {\n  console.log(`[server]: Server is running at http://localhost:${port}`);\n});\n"]}
```

Note how file path for `tsexpress-`sample contain relative path, while ts-jest ones contain absolute path.

#Repro steps

Run `npm run debug` and connect Chrome debugger by going to `chrome://inspect`.
