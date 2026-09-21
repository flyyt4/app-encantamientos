/**
 @typedef {{
     id: number,
     name: string,
  }} Enchantment
*/

class AppState {
  /** @type {(state: AppState) => void} */
  #subscribers = [];

  /** @type {Enchantment[]} */
  #enchantments = [];

  /** @type {string | null} */
  #item = null;

  /** @type {string} */
  #version = "26.3";

  /** @type {Enchantment[]} */
  #inventory = JSON.parse(localStorage.getItem("inventory")) || [];

  /** @returns {Enchantment[]} */
  get enchantments() {
    return this.#enchantments;
  }

  /**
   * @param {Enchantment[]} enchantments
   */
  set enchantments(enchantments) {
    this.#enchantments = enchantments;
    this.#notify();
  }

  /** @returns {string} */
  get version() {
    return this.#version;
  }

  set version(version) {
    this.#version = version;
    this.#notify();
  }

  /** @returns {string | null} */
  set item(item) {
    this.#item = item;
    this.#notify();
  }

  /** @returns {string | null} */
  get item() {
    return this.#item;
  }

  /** @returns {string | null} */
  set item(item) {
    this.#item = item;
    this.#notify();
  }

  /**
   * @param {(state: AppState) => void | Promise<void>} callback
   */
  suscribe(callback) {
    this.#subscribers.push(callback);
  }

  /**
   * @param {(state: AppState) => void} callback
   */
  unsubscribe(callback) {
    this.#subscribers = this.#subscribers.filter((cb) => cb !== callback);
  }

  #notify() {
    this.#subscribers.forEach((cb) => cb(this));
  }

  /**
   * @returns {Enchantment[]}
   */
  get inventory() {
    const value = localStorage.getItem("inventory");
    this.#inventory = value ? JSON.parse(value) : [];
    return this.#inventory;
  }

  /**
   * @param {Enchantment[]} enchantments
   */
  set inventory(enchantments) {
    localStorage.setItem("inventory", JSON.stringify(enchantments));
    this.#inventory = enchantments;
    this.#notify();
  }
}

export const appState = new AppState();
