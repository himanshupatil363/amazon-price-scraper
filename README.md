# amazon-price-scraper

This project is a dynamic amazon web scraper which takes product names from user and gives back a csv file consisting product name along with the 
average of first 20 search results from the amazon.

---
## Requirements

For development, you will only need Node.js installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

###
---

## Install

    $ git clone https://github.com/himanshupatil363/amazon-price-scraper.git
    $ cd amazon-price-scraper
    $ npm install

## Running the project

    $ node index.js
