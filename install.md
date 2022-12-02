# Install and Run Threewide

Ensure you have git, Node.js, and mongodb community edition installed.

In your terminal emulator, run this command:

```
$ git clone https://github.com/teamcrusher/threewide.git
```

The output should look similar to this:

```
> Cloning into `threewide`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remote: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Then change directories to `threewide/threewide`:

```
cd your/path/to/threewide/threewide
```

Then init node.js in `threewide` to install dependencies from `package.json` automatically:

```
npm i
```

The output should look similar to this:

```
❯ npm i

up to date, audited 450 packages in 892ms

109 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

~/your/path/to/threewide/threewide main* ❯
```

Then run start mongodb, refer to their documentation on how to start your installation as it varies by OS.

Then run threewide with:

```
npm run dev
```

The output should look similar to this:

```
❯ npm run dev

> threewide@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /your/path/to/threewide/threewide/.env
info  - Using tsconfig file: ./tsconfig.json
event - compiled client and server successfully in 1908 ms (273 modules)
```

Click on `http://localhost:3000` to open threewide in your browser if your shell supports clickable links, otherwise copy and paste `http://localhost:3000` into the address bar of your favourite browser, just not Internet Explorer.
