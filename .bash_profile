# Functions
shortener () {
  pushd ~/Repositories/shortener/ && yarn run shorten $1 $2 && popd
}

killport() { lsof -i tcp:"$*" | awk 'NR!=1 {print $2}' | xargs kill -9 ;}

# Aliases
alias ..="cd ..";
alias ...="cd ../..";
alias ....="cd ../../..";
alias .....="cd ../../../..";
alias ~="cd ~";

alias repos="cd ~/Repositories";
alias desktop="cd ~/Desktop";

alias shorten=shortener;
alias showFiles="defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder";
alias hideFiles="defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder";

alias git=hub