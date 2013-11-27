module ImWatchingYou
  class Detector
    def initialize(args)
      @args = args
      case args.first
      when "-h", "--help", "help"
        self.help
      when "-c" , "--configure", "configure"
        self.config
      when nil
        self.launch
      else
        self.something_wrong
      end
    end
    
    def config
      Config::config_keys
    end

    def help
      Help::display_help
    end

    def something_wrong
      Help::display_something_wrong
    end

    def launch

    end
  end
end