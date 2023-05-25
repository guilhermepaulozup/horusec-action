module.exports = {
  FULL_SUMMARY: () => {
    return `<h1>Horusec</h1>
<h3>Results Summary</h3>
<span title="Critical" style="color:red">C</span>: 1
<span title="High" style="color:orange">H</span>: 1 
<span title="Medium" style="color:yellow">M</span>: 1 
<span title="Low" style="color:green">L</span>: 1 
<span title="Info" style="color:blue">I</span>: 0 
<span title="Unknown" style="color:red">U</span>: 0<br>
<details><summary>Execution details.</summary><ul><li><strong>Scan ID</strong>: e6559b8f-a04c-44a0-8e61-8e742684ecf9</li>
<li><strong>Horusec Version</strong>: v2.8.0</li>
<li><strong>Status</strong>: success</li>
<li><strong>Errors</strong>: </li></ul></details>
<br>
<details><summary>List of vulnerabilities found by Horusec.</summary><table><tr><th>Severity</th><th>File</th><th>Line/Column</th><th>Rule ID</th><th>Details</th><th>Vuln ID</th><th>Commit Author</th><th>Commit Date</th></tr><tr><td>CRITICAL</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td><td>5b7fc45b1bf19@example.com</td><td>2022-12-22 15:36:09 -0300</td></tr><tr><td>HIGH</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td><td>5b7fc45b1bf19@example.com</td><td>2022-12-22 15:36:09 -0300</td></tr><tr><td>MEDIUM</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td><td>5b7fc45b1bf19@example.com</td><td>2022-12-22 15:36:09 -0300</td></tr><tr><td>LOW</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td><td>5b7fc45b1bf19@example.com</td><td>2022-12-22 15:36:09 -0300</td></tr></table></details>
`;
  },

  DEFAULT_SUMMARY: () => {
    return `<h1>Horusec</h1>
<h3>Results Summary</h3>
<span title="Critical" style="color:red">C</span>: 1
<span title="High" style="color:orange">H</span>: 1 
<span title="Medium" style="color:yellow">M</span>: 1 
<span title="Low" style="color:green">L</span>: 1 
<span title="Info" style="color:blue">I</span>: 0 
<span title="Unknown" style="color:red">U</span>: 0<br>
<details><summary>Execution details.</summary><ul><li><strong>Scan ID</strong>: e6559b8f-a04c-44a0-8e61-8e742684ecf9</li>
<li><strong>Horusec Version</strong>: v2.8.0</li>
<li><strong>Status</strong>: success</li>
<li><strong>Errors</strong>: </li></ul></details>
<br>
<details><summary>List of vulnerabilities found by Horusec.</summary><table><tr><th>Severity</th><th>File</th><th>Line/Column</th><th>Rule ID</th><th>Details</th><th>Vuln ID</th></tr><tr><td>CRITICAL</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td></tr><tr><td>HIGH</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td></tr><tr><td>MEDIUM</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td></tr><tr><td>LOW</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td></tr></table></details>
`;
  },

  SEVERITY_FILTERED_SUMMARY: () => {
    return `<h1>Horusec</h1>
<h3>Results Summary</h3>
<span title="Critical" style="color:red">C</span>: 1
<span title="High" style="color:orange">H</span>: 1 
<span title="Medium" style="color:yellow">M</span>: 1 
<span title="Low" style="color:green">L</span>: 1 
<span title="Info" style="color:blue">I</span>: 0 
<span title="Unknown" style="color:red">U</span>: 0<br>
<details><summary>Execution details.</summary><ul><li><strong>Scan ID</strong>: e6559b8f-a04c-44a0-8e61-8e742684ecf9</li>
<li><strong>Horusec Version</strong>: v2.8.0</li>
<li><strong>Status</strong>: success</li>
<li><strong>Errors</strong>: </li></ul></details>
<br>
<details><summary>List of CRIT and HIGH vulnerabilities found by Horusec.</summary><table><tr><th>Severity</th><th>File</th><th>Line/Column</th><th>Rule ID</th><th>Details</th><th>Vuln ID</th><th>Commit Author</th><th>Commit Date</th></tr><tr><td>CRITICAL</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td><td>5b7fc45b1bf19@example.com</td><td>2022-12-22 15:36:09 -0300</td></tr><tr><td>HIGH</td><td><a href="https://github.com/test-owner/test-repo/blob/test-ref/tests/metrics/test_metricsbuilder.py">tests/metrics/test_metricsbuilder.py</a></td><td>246:42</td><td>HS-LEAKS-27</td><td><details><summary>More...</summary>(1/1) * Possible vulnerability detected: Password found in a hardcoded URL
A password was found in a hardcoded URL, this can lead to not only the leak of this password but also a failure point to some more sophisticated CSRF and SSRF attacks. Check CWE-352 (https://cwe.mitre.org/data/definitions/352.html) and CWE-918 (https://cwe.mitre.org/data/definitions/918.html) for more details.</details></td><td>88d665ec-500e-4747-a0b8-71943e25ad6d</td><td>5b7fc45b1bf19@example.com</td><td>2022-12-22 15:36:09 -0300</td></tr></table></details>
`;
  }

}
