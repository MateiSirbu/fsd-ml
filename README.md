# FSD-ML

![Hero](./miscellaneous/README%20assets/hero.png)

## <img align="right" src="./miscellaneous/README%20assets/logo.png"> Synopsis 

This is _FSD-ML_ (shorthand for _Full-Stack web Development meets Machine Learning_), a proof-of-concept web app that highlights the core features of the _PEAN_ stack, the _TensorFlow_ library and the _Google Cloud Platform_. It was developed during the Spring 2021 FSD course of UniTBv as a joint effort by [Matei Sîrbu](http://github.com/MateiSirbu), [Dragoș Tătaru](http://github.com/dragoscata) and [Lucian Stănilă](http://github.com/slucians).

## Project overview

- [`./frontend/`](./frontend/) — Implements a friendly and responsive GUI, powered by the _Angular Material_ framework. Facilitates the login and sign-up process, allows uploading of [MNIST](http://yann.lecun.com/exdb/mnist/) handwritten digits to the backend, displays previous TensorFlow digit classifications, enumerates nutrition facts stored in a GCP datastore and more.
- [`./backend/`](./backend) — Does all the heavy lifting. Creates a REST API via _Express.js_, handles user authentication by signing and verifying JSON Web Tokens (_JWTs_) using a RS256 keypair, classifies digits via _TensorFlow_ using a pre-trained convolutional neural network (_CNN_) model and connects to a PostgreSQL database using _TypeORM_.
- [`./functions/`](./functions) — Defines essential JavaScript cloud functions that interact with a GCP datastore. Includes Unix-style shell scripts for easy deployment of the aforementioned functions.
- [`./miscellaneous/`](./miscellaneous) — Additional resources provided for quick access and ease of use: SDKs, handwritten digits, etc.

## Disclaimer

The shell scripts and SDKs provided herein activate certain Google Cloud Platform services, and therefore might incur additional charges. The authors cannot be held liable for damages due to inappropiate usage, so make sure you do your own research first.