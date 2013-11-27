module ImWatchingYou
  class Viewer
    def initialize(tweet)
      @tweet      = tweet
    end

    def display
      screen_name = @tweet.user.screen_name.foreground(:cyan)
      name        = ' [' + @tweet.user.name.foreground(:yellow) + ']: '
      text        = @tweet.text.bright

      # @PSEUDO [REALNAME]: This is a tweet
      prettyTweet = screen_name + name + text
      puts prettyTweet
    end    
  end
end