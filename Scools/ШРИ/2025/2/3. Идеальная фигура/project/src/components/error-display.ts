class ErrorDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = `
      <style>
        .error-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ff5252;
          color: white;
          padding: 1rem;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          z-index: 9999;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .message {
          margin: 0;
          font-size: 1.1rem;
        }
      </style>
      <div class="error-container">
        <p class="message">
          <slot></slot>
        </p>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;
    }
  }
}

customElements.define('error-display', ErrorDisplay); 