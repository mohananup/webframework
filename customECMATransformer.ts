import type { Config } from "@jest/types";
import type { RawSourceMap } from "source-map";


interface SyncTransformer<OptionType = unknown> {
  /**
   * Indicates if the transformer is capable of instrumenting the code for code coverage.
   *
   * If V8 coverage is _not_ active, and this is `true`, Jest will assume the code is instrumented.
   * If V8 coverage is _not_ active, and this is `false`. Jest will instrument the code returned by this transformer using Babel.
   */
  canInstrument?: boolean;
  createTransformer?: (options?: OptionType) => SyncTransformer<OptionType>;

  getCacheKey?: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => string;

  getCacheKeyAsync?: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => Promise<string>;

  process: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => TransformedSource;

  processAsync?: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => Promise<TransformedSource>;
}

interface AsyncTransformer<OptionType = unknown> {
  /**
   * Indicates if the transformer is capable of instrumenting the code for code coverage.
   *
   * If V8 coverage is _not_ active, and this is `true`, Jest will assume the code is instrumented.
   * If V8 coverage is _not_ active, and this is `false`. Jest will instrument the code returned by this transformer using Babel.
   */
  canInstrument?: boolean;
  createTransformer?: (options?: OptionType) => AsyncTransformer<OptionType>;

  getCacheKey?: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => string;

  getCacheKeyAsync?: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => Promise<string>;

  process?: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => TransformedSource;

  processAsync: (
    sourceText: string,
    sourcePath: Config.Path,
    options: TransformOptions<OptionType>,
  ) => Promise<TransformedSource>;
}

type Transformer<OptionType = unknown> =
  | SyncTransformer<OptionType>
  | AsyncTransformer<OptionType>;

interface TransformOptions<OptionType> {
  /**
   * If a transformer does module resolution and reads files, it should populate `cacheFS` so that
   * Jest avoids reading the same files again, improving performance. `cacheFS` stores entries of
   * <file path, file contents>
   */
  cacheFS: Map<string, string>;
  config: Config.ProjectConfig;
  /** A stringified version of the configuration - useful in cache busting */
  configString: string;
  instrument: boolean;
  // names are copied from babel: https://babeljs.io/docs/en/options#caller
  supportsDynamicImport: true;
  supportsExportNamespaceFrom: boolean;
  supportsStaticESM: true;
  supportsTopLevelAwait: boolean;
  /** the options passed through Jest's config by the user */
  transformerConfig: OptionType;
}

type TransformedSource =
  | {code: string; map?: RawSourceMap | string | null}
  | string;

// Config.ProjectConfig can be seen in code [here](https://github.com/facebook/jest/blob/v26.6.3/packages/jest-types/src/Config.ts#L323)
// RawSourceMap comes from [`source-map`](https://github.com/mozilla/source-map/blob/0.6.1/source-map.d.ts#L6-L12)