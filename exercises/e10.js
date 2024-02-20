export const getFirstResolvedPromise = (promises) => {
  //*  write code to pass test ⬇ ️
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(() => {});
    });
  });
};

export const getFirstPromiseOrFail = (promises) => {
  //*  write code to pass test ⬇ ️
  return new Promise((resolve, reject) => {
    let resolvedCount = 0;

    promises.forEach((promise) => {
      promise
        .then((result) => {
          resolvedCount++;
          if (resolvedCount === 1) {
            resolve(result);
          }
        })
        .catch((error) => {
          if (resolvedCount === 0) {
            reject(error);
          }
        });
    });
  });
};

export function getQuantityOfRejectedPromises(promises) {
  return new Promise((resolve) => {
    let rejectedCount = 0;

    promises.forEach((promise) => {
      promise.catch(() => {
        rejectedCount++;
      });
    });

    Promise.race(promises.map((p) => p.catch(() => "rejected"))).then(() => {
      resolve(rejectedCount);
    });
  });
}

export const getQuantityOfFulfilledPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  let resolvedCount = 0;

  return Promise.all(
    promises.map((promise) =>
      promise
        .then(() => {
          resolvedCount++;
        })
        .catch(() => {})
    )
  ).then(() => resolvedCount);
};

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Array ⬇ ⬇ ⬇ ⬇
export const allCharacters = [
  { id: 1, name: "billy" },
  { id: 2, name: "mandy" },
  { id: 3, name: "grim" },
];
//! ⬆  ⬆  ⬆  ⬆ do not edit this array   ⬆  ⬆  ⬆  ⬆ ️

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Function ⬇ ⬇ ⬇ ⬇
export const fetchCharacterById = (id) => {
  // This function simulates an API, although most api's will return
  // simple data like this quickly, we want you to practice concurrent programming
  // so we're forcing each call to take one second

  const validIds = allCharacters.map((character) => character.id);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validIds.includes(id))
        reject(`we do not have a character with the id of ${id}`);

      return resolve(allCharacters.find((character) => character.id === id));
    }, 1000);
  });
};
//! ⬆  ⬆  ⬆  ⬆ do not edit this function   ⬆  ⬆  ⬆  ⬆ ️

export const fetchAllCharactersByIds = async (ids) => {
  // To solve this you must fetch all characters passed in the array at the same time
  // use the `fetchCharacterById` function above to make this work
  //*  write code to pass test ⬇ ️
  const validIds = ids.filter((id) =>
    allCharacters.some((character) => character.id === id)
  );

  if (validIds.length !== ids.length) {
    return [];
  }

  try {
    const characters = await Promise.all(
      validIds.map((id) => fetchCharacterById(id))
    );
    return characters;
  } catch (error) {
    return [];
  }
};
