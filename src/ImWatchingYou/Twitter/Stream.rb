module ImWatchingYou
  class Stream
    def self.connect
      keys = YAML.load_file('../config/keys.yml')
      client = Twitter::Streaming::Client.new do |config|
        config.consumer_key        = keys["consumer_key"]
        config.consumer_secret     = keys["consumer_secret"]
        config.access_token        = keys["access_token"]
        config.access_token_secret = keys["access_token_secret"]
      end
      @client_stream = client
    end
    def self.get_stream
      self.connect
      return @client_stream
    end
  end
end