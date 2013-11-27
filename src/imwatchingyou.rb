$: << File.dirname(__FILE__)

require 'pp'

require 'ImWatchingYou/CLI/Detector'
require 'ImWatchingYou/CLI/Help'

module ImWatchingYou
  Detector.new(ARGV)
end