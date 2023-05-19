# horusec-action
GitHub action for running [Horusec](https://github.com/ZupIT/horusec) Cli in repository.


## Usage

Just follow the example below:

```yaml
      - name: Horusec
        uses: ZupIT/horusec-action@latest
        with:
          github-token: ${{github.token}}
```

Obs: The ```${{github.token}}``` is only used to fetch the correct cli **binary** version based on ```hoursec-version``` input.

## Inputs

In addition to some derived from the Cli flags (like ignore, project-path, analysis-timeout, etc..., check the [actions.yml](action.yml) file). 

There some extra commands:

| Inputs | Example | Desc |
|--------|---------|------|
| github-token | ${{ github.token }} | The inner container github token to be used to fetch horusec cli binary. | 
| horusec-version | v2.8.0 | The binary version to use in the execution, defaults to latest release.