# AST generation tool

Scripts to execute the full AST pipeline of the binnacle tool.


# How-To

Provide the input dockerfiles in `tool/blobs` using the naming format `<sha1>.Dockerfile` (e.g., `b44fe599d09c171dd7eff806638f78b1881c30a0.Dockerfile`)

To start the AST generation pipeline, run the command:
```
bash run_pipeline.sh
```

The final output can be found at:
```
./4-abstracted-asts/outputs
```