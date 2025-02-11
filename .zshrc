eval "$(starship init zsh)"

# Auto-switch Node.js versions when .nvmrc is present
# https://wouterds.com/blog/auto-switch-nodejs-version-using-nvm-zsh-hooks
autoload -U add-zsh-hook

load_nvm_version() {
  if [[ -f .nvmrc ]]; then
    nvm use || nvm install
  fi
}

add-zsh-hook chpwd load_nvm_version
load_nvm_version
