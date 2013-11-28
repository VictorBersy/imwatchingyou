module ImWatchingYou
  class Handler
    def initialize(message)
      @message = message
      self.identify(message)
    end
    
    def identify(message)
      case message
      when Twitter::Tweet
        Viewer::tweet(message)
      when Twitter::DirectMessage
        Viewer::direct_message(message)
      when Twitter::Streaming::Event
        Viewer::event(message)
      when Twitter::Streaming::FriendList
        Viewer::friend_list(message)
      end
    end
  end
end