export default {
  bind(el, {value}) {
    window.M.Tooltip.init(el, {html: value});
  },
  unbind(el) {
    const tooltip = window.M.getInstance(el);
    if (tooltip && tooltip.destroy) tooltip.destroy();
  }
}