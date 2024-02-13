test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

beforeEach(() => {
  fetch(`${SERVER_URL}/deleteAllNotes`, {method: "DELETE"});
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: title,
    content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});


test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const allNotesRes =  await fetch(`${SERVER_URL}/getAllNotes`, {method: "GET"});
  const allNotesBody = await allNotesRes.json();
  expect(allNotesRes.status).toBe(200);
  expect(allNotesBody.response.length).toStrictEqual(0);
});


test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "1",
    content: "content",
    }),
  });
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "2",
    content: "content",
    }),
  });
  
  const allNotesRes =  await fetch(`${SERVER_URL}/getAllNotes`, {method: "GET"});
  const allNotesBody = await allNotesRes.json();
  expect(allNotesRes.status).toBe(200);
  expect(allNotesBody.response.length).toStrictEqual(2);
});


test("/deleteNote - Delete a note", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "1",
    content: "content",
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {method: "DELETE"});
  const deleteNoteBody = await deleteNoteRes.json();
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});


test("/patchNote - Patch with content and title", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "old title",
    content: "old content",
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "new title",
    content: "new content"
    }),
  });
  const patchoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/patchNote - Patch with just title", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "old title",
    content: "old content",
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "new title"
    }),
  });
  const patchoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/patchNote - Patch with just content", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "old title",
    content: "old content",
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    content: "new content"
    }),
  });
  const patchoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/deleteAllNotes - Delete one note", async () => {
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "1",
    content: "content",
    }),
  });

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {method: "DELETE"});
  const deleteNoteBody = await deleteNoteRes.json();
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`1 note(s) deleted.`);
});


test("/deleteAllNotes - Delete three notes", async () => {
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "1",
    content: "content",
    }),
  });
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "2",
    content: "content",
    }),
  });
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "3",
    content: "content",
    }),
  });

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {method: "DELETE"});
  const deleteNoteBody = await deleteNoteRes.json();
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`3 note(s) deleted.`);
});


test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: "1",
    content: "content",
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const updateColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color: "#ff0000" }),
  });
  const updateColorBody = await updateColorRes.json();
  expect(updateColorRes.status).toBe(200);
  expect(updateColorBody.message).toBe(`Note color updated successfully.`);
});