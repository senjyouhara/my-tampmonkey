const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { writeFileSync } = require("fs");

module.exports = function (options) {
  const { isDev, name, meta, output } = options;
  const root = path.resolve(__dirname, "../..", name);
  const minimizer = [
    new webpack.BannerPlugin({
      banner: meta,
      raw: true,
    }),
  ];
  if (!isDev) {
    minimizer.unshift(new TerserPlugin());
  }
  const cssLoader = [
    !isDev && "gm-style-loader",
    isDev && {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
        sourceMap: true,
        modules: true,
      },
    },
  ].filter(Boolean);

  const lessLoader = [...cssLoader];
  lessLoader.push({
    loader: "less-loader",
  });

  if (!isDev) {
    cssLoader.push({
      loader: "postcss-loader",
    });
    lessLoader.push({
      loader: "postcss-loader",
    });
  }

  const babelLoader = {
    loader: "babel-loader",
  };
  return {
    devtool: "source-map",
    context: root,
    entry: {
      [name + ".user"]: path.resolve(root, "src/index"),
    },
    mode: isDev ? "development" : "production",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(root, "src"),
          use: babelLoader,
        },
        {
          test: /\.tsx?$/,
          include: path.resolve(root, "src"),
          use: [babelLoader],
        },
        {
          test: /\.css$/,
          use: cssLoader,
        },
        {
          test: /\.less$/,
          use: lessLoader,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    output: {
      filename: "[name].js",
      path: output,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "title",
        inject: true,
        template: path.join(__dirname, "../public/index.html"),
      }),
      new ProgressBarPlugin({
        summary: false,
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("Generate meta.js", () => {
            writeFileSync(
              path.resolve(output, name + ".meta.js"),
              meta.trim(),
              {
                encoding: "UTF-8",
              },
            );
          });
        },
      },
    ],
    optimization: {
      minimize: !isDev,
      minimizer: minimizer,
    },
    resolveLoader: {
      modules: ["node_modules", path.resolve(__dirname, "loader")],
    },
    stats: "verbose",
  };
};
