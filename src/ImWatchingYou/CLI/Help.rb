module ImWatchingYou
  class Help
    def self.display_help
      imwatchingyou_help = <<-EOS
Usage: ./imwatchingyou [OPTION]
  -c, --configure          configure imwatchingyou with Twitter API keys
  -h, --help               display this message
      EOS
      puts imwatchingyou_help
    end

    def self.display_something_wrong
      puts "Woops, there is something wrong. Take a look at the help :"
      self.display_help
    end
  end
end