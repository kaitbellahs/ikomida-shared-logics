# ikomida-shared-logics

Business rules that must agree on the server and in the client.

> Part of the **iKomida** platform. See **[ikomida-k8s-config](https://github.com/kaitbellahs/ikomida-k8s-config)** for the architecture overview of all 31 repositories.

---

## Role

Small by design and deliberately dependency-light. What lives here are the calculations that would be a bug if the server and the app disagreed about them — delivery fees, totals, whether a store is open right now.

Duplicating such a rule in a front end is one of the most common ways a distributed system starts lying to its users. Extracting it into a package both sides import removes the possibility.

## Stack

TypeScript · rollup · API Extractor · published as a versioned npm package

## Build

```bash
yarn install
yarn build
yarn build:types   # API Extractor rollup of .d.ts
```

## Status

Built in 2022. The platform is no longer deployed; this repository is published as a record of the work. **The commit history predates generative AI coding assistants.**

## License

Licensed under the [Apache License 2.0](LICENSE) — free for commercial use, provided the copyright notice and [NOTICE](NOTICE) are retained.

Copyright 2022 Khalid Ait Bellahs.
