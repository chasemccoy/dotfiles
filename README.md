# dotfiles

## `.gitignore_global`

Copy into `~/.gitignore` and then run `git config --global core.excludesfile ~/.gitignore`

## Setting up your Mac

1. Update macOS to the latest version through system preferences
2. [Generate a new public and private SSH key](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) by running:

   ```zsh
   curl https://raw.githubusercontent.com/chasemccoy/dotfiles/HEAD/ssh.sh | sh -s "chasem000@gmail.com"
   ```

3. Clone this repo to `~/Repositories/dotfiles` with:

    ```zsh
    git clone --recursive git@github.com:chasemccoy/dotfiles.git ~/Repositories/dotfiles
    ```

4. Run the installation with:

    ```zsh
    ~/Repositories/dotfiles/setup.sh
    ```
