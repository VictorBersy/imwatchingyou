module ImWatchingYou
  class Launcher
    def self.start
      # Stream::get_stream.user() do |message|
      Stream::get_stream.user(:replies => 'all') do |message|
        Handler.new(message)
      end
    end
  end
end