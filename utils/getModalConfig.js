// libs/getModalConfig.js

/**
 * @param {string} modalType - Type of modal (e.g., 'add', 'edit', 'delete')
 * @param {object} modalConfig - Key-value object with modal type as key and config as value
 * @returns {{ title: string, content: JSX.Element|null }}
 */
export const getModalConfig = (modalType, modalConfig) => {
  return (
    modalConfig[modalType] || {
      title: "Invalid Modal",
      content: <p>No content</p>
    }
  );
};
