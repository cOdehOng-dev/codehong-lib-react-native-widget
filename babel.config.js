module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          widget: './widget/index.ts',
        },
      },
    ],
  ],
};
