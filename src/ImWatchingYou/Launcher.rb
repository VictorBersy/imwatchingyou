module ImWatchingYou
  class Launcher
    def self.start
      Stream::get_stream.user(:replies => 'all') do |message|
        if message.is_a?(Twitter::Tweet)
          tweet = message
          viewer = Viewer.new(tweet)
          viewer.display
        end
      end
    end
  end
end