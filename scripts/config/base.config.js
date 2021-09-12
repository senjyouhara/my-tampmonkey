const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require('fs-extra')

module.exports = function (options) {
    const {isDev, name, meta, output, packageDir, root} = options;
    const minimizer = [
        meta && new webpack.BannerPlugin({
            banner: meta,
            raw: true,
        }),
    ].filter(Boolean);

    if (!isDev) {
        minimizer.unshift(new TerserPlugin());
    }

    const cssLoader = [
        !isDev && {loader: "gm-style-loader"},
        isDev && {
            loader: "style-loader",
        },
        {
            loader: "css-loader",
        },
    ].filter(Boolean);

    const lessLoader = [...cssLoader];
    lessLoader.pop()

    lessLoader.push({
        loader: "css-loader",
        options: {
            modules: true,
        },
    },);
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
        options: {
          rootMode: 'upward'
        }
    };
    return {
        devtool: "source-map",
        context: packageDir,
        entry: {
            [name]: path.resolve(packageDir, "src/index"),
        },
        mode: isDev ? "development" : "production",
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(packageDir, "src"),
                    use: babelLoader,
                },
                {
                    test: /\.tsx?$/,
                    include: path.resolve(packageDir, "src"),
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
            modules: [path.resolve(packageDir, "node_modules"), 'node_modules'],
            extensions: [".tsx", ".ts", ".jsx", ".js"],
        },
        output: {
            filename: "[name].js",
            path: output,
        },
        plugins: [
            isDev && new HtmlWebpackPlugin({
                title: "title",
                inject: true,
                template: path.resolve(root, "public/index.html"),
            }),
            new ProgressBarPlugin({
                summary: false,
            }),
            !isDev && meta && {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap("Generate meta.js", () => {
                        fs.writeFileSync(
                            path.resolve(output, name + ".meta.js"),
                            meta.trim(),
                            {
                                encoding: "UTF-8",
                            },
                        );
                    });

                },
            },
            !isDev && {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap("myCustom", () => {
                        try {
                            fs.copySync(output, path.resolve(root, 'build', name))
                            console.log('success!')
                        } catch (err) {
                            console.error(err)
                        }
                    });

                },
            },
        ].filter(Boolean),
        optimization: {
            minimize: !isDev,
            minimizer: minimizer,
        },
        resolveLoader: {
            modules: [path.resolve(packageDir, "node_modules"), "node_modules", path.resolve(__dirname, "loader")],
        },
        stats: "verbose",
    };
};
