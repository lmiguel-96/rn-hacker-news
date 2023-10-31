module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./src/screens/index",
            "@hooks": "./src/hooks/index",
            "@api": "./src/api/index",
            "@navigation": "./src/navigation/index",
            "@utils": "./src/utils/index",
            "@components": "./src/components/index",
            "@types": "./src/types/index",
          },
        },
      ],
    ],
  };
};
