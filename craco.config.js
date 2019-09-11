/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { whenProd, ESLINT_MODES } = require('@craco/craco');
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  style: {
    modules: {
      localIdentName: whenProd(() => '[hash:base64:8]', '[name]_[local]_[hash:base64:8]'),
    },
  },
  eslint: {
    mode: ESLINT_MODES.file,
  },

  plugins: [{
    plugin: CracoAntDesignPlugin,
    options: {
      customizeThemeLessPath: path.join(
        __dirname,
        'src/constans/antTheme.less',
      ),
    },
  }],
};
