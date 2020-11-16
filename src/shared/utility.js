// A method to update objects dynamically
export const updateObject = (oldObj, updatedProps) => {
  return {
    ...oldObj,
    ...updatedProps,
  };
};
