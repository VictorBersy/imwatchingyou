$: << File.dirname(__FILE__)

require 'pp'
require 'yaml'

require 'ImWatchingYou/CLI/Detector'
require 'ImWatchingYou/CLI/Help'
require 'ImWatchingYou/CLI/Config'

module ImWatchingYou
  unless ARGV.first.nil?
    Detector.new(ARGV)
  else
    pp "Launcher"
  end
end