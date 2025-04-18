/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const isProduction = process.env.NODE_ENV === 'production' || isGitHubPages

const nextConfig = {
  output: 'export',
  basePath: isProduction ? '/compliance-ui' : '',
  assetPrefix: isProduction ? '/compliance-ui' : '',
}

module.exports = nextConfig 