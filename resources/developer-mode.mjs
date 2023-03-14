
function formatTestName(suiteName, testName) {
  return suiteName + (testName ? `/${testName}` : "");
}

let container = null;

export function createDeveloperModeContainer() {

  if (container) {
    return container;
  }

  container = document.createElement("div");
  container.className = "developer-mode";

  let details = document.createElement("details");
  details.open = true;

  let summay = document.createElement("summary");
  summay.textContent = "Developer Mode";
  details.append(summay);

  let content = document.createElement("div");
  content.className = "developer-mode-content";
  details.append(content);

  container.append(details);
  return container;
}

export function createUIForSuites(suites, onStep, onRunSuites) {
  const control = document.createElement("nav");
  const ol = document.createElement("ol");
  const checkboxes = [];
  for (let suiteIndex = 0; suiteIndex < suites.length; suiteIndex++) {
      const suite = suites[suiteIndex];
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.id = suite.name;
      checkbox.type = "checkbox";
      checkbox.checked = !suite.disabled;
      checkbox.onchange = () => {
          suite.disabled = !checkbox.checked;
      };
      checkbox.onchange();
      checkboxes.push(checkbox);

      li.appendChild(checkbox);
      var label = document.createElement("label");
      label.appendChild(document.createTextNode(formatTestName(suite.name)));
      li.appendChild(label);
      label.htmlFor = checkbox.id;

      const testList = document.createElement("ol");
      for (let testIndex = 0; testIndex < suite.tests.length; testIndex++) {
          const testItem = document.createElement("li");
          const test = suite.tests[testIndex];
          const anchor = document.createElement("a");
          anchor.id = `${suite.name}-${test.name}`;
          test.anchor = anchor;
          anchor.appendChild(document.createTextNode(formatTestName(suite.name, test.name)));
          testItem.appendChild(anchor);
          testList.appendChild(testItem);
      }
      li.appendChild(testList);

      ol.appendChild(li);
  }

  control.appendChild(ol);

  let button = document.createElement("button");
  button.textContent = "Step";
  button.onclick = onStep;
  control.appendChild(button);

  button = document.createElement("button");
  button.textContent = "Run";
  button.id = "runSuites";
  button.onclick = onRunSuites;
  control.appendChild(button);

  button = document.createElement("button");
  button.textContent = "Select all";
  button.onclick = () => {
      for (var suiteIndex = 0; suiteIndex < suites.length; suiteIndex++) {
          suites[suiteIndex].disabled = false;
          checkboxes[suiteIndex].checked = true;
      }
  };
  control.appendChild(button);

  button = document.createElement("button");
  button.textContent = "Unselect all";
  button.onclick = () => {
      for (var suiteIndex = 0; suiteIndex < suites.length; suiteIndex++) {
          suites[suiteIndex].disabled = true;
          checkboxes[suiteIndex].checked = false;
      }
  };
  control.appendChild(button);

  return control;
}
