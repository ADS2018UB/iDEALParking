const preactCliTypeScript = require('preact-cli-plugin-typescript');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function(config, _env, helpers) {
  preactCliTypeScript(config);

  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      BASE_API_PATH: JSON.stringify(process.env.BASE_API_PATH || '')
    })
  );
}
