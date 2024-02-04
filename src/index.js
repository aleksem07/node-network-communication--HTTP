function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello, HTTP';

  return element;
}

document.body.appendChild(component());
