# horusec-action
GitHub action for running [Horusec](https://github.com/ZupIT/horusec) Cli in repository.

## Usage

Copy the example below, it should be 

```yaml
      - name: Horusec
        uses: ZupIT/horusec-action@latest
        with:
          github-token: ${{github.token}}
```

Obs: The ```${{github.token}}``` is only used to fetch the correct cli **binary** version based on ```horusec-version``` input.

## Inputs

In addition to some derived from the Cli flags (like ignore, project-path, analysis-timeout, etc..., check the [actions.yml](action.yml) file). 

There some extra commands:

| Inputs | Example | Desc |
|--------|---------|------|
| horusec-version | v2.8.0 | The binary version to use in the execution (based on release tag name), defaults to latest release. |
| github-token | ${{ github.token }} | The inner container github token to be used to fetch horusec cli binary. | 
| return-error | true | If the action should return an error to the workflow. (Obs: Although horusec cli have a --return-error flag, this input does not use this flag.) |
| use-summary | true | If the results should be printed to action summary (only crits and high are printed). Limits to 50 rows. |
<!-- | use-issues | true | Generate an new issue on the repo with the vulnerabilities found. | -->
<!-- | export-artifact | true | If an action artifact should be created with the results of the scan. | -->

