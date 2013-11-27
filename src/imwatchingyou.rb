$: << File.dirname(__FILE__)

require 'pp'
require 'yaml'
require 'rainbow'
require 'twitter'

require 'ImWatchingYou/CLI/Detector'
require 'ImWatchingYou/CLI/Help'
require 'ImWatchingYou/CLI/Config'

require 'ImWatchingYou/Twitter/Stream'

require 'ImWatchingYou/Display/Viewer'

require 'ImWatchingYou/Launcher'

module ImWatchingYou
  unless ARGV.first.nil?
    Detector.new(ARGV)
  else
    Launcher::start
  end
end