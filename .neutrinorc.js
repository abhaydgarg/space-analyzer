module.exports = {
  options: {
    output: 'docs'
  },
  use: [
    ['@neutrinojs/react', {
      html: {
        title: 'Space analyzer | Visualizes disk or directory usage',
        minify: {
          useShortDoctype: true,
          keepClosingSlash: true,
          collapseWhitespace: true,
          preserveLineBreaks: false
        },
        googleAnalytics: googleAnalytics(),
        links: [
          {
            href: 'https://fonts.googleapis.com/css?family=Iceberg&display=swap',
            rel: 'stylesheet'
          },
          {
            href: './static/favicon.png',
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png'
          }
        ],
        meta: [
          {
            name: 'author',
            content: 'Abhay Garg'
          },
          {
            name: 'description',
            content: 'Space analyzer is a tool that visualizes disk or directory usage.'
          },
          {
            name: 'keywords',
            content: 'space, disk, folder, directory, analyze, analyzer, visualize, usage'
          }
        ],
      }
    }],
    ['@neutrinojs/style-loader', {
      test: /\.(css|sass|scss)$/,
      moduleTest: /\.module\.(css|sass|scss)$/,
      loaders: ['sass-loader']
    }]
  ]
};

function googleAnalytics () {
  if (process.env.NODE_ENV === 'development') {
    return undefined;
  }
  return {
    trackingId: 'UA-142544613-1',
    pageViewOnLoad: true
  }
}
