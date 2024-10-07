/* eslint-disable no-redeclare */
import { useState } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Section,
  NoteItem,
  Textarea,
  Input,
  Header,
} from "../../components";
import { api } from "../../services/api";
import { ButtonText } from "../../components/ButtonText";
import { Container, Form } from "./styles";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  // async function handleNowNote() {
  //   if (!title) {
  //     return alert("digite o titulo da nota");
  //   }

  //   if (newLink) {
  //     return alert(
  //       "voce deixou um link no campo para adicionar, mas nao clicou em adicionar ou deixe o campo vazio"
  //     );
  //   }

  //   if (newTag) {
  //     return alert(
  //       "voce deixou uma tag no campo para adicionar, mas nao clicou em adicionar ou deixe o campo vazio"
  //     );
  //   }
  // }

  async function handleNowNote() {
    const user = JSON.parse(localStorage.getItem("@rocketnotes:user"));
    console.log(user);
    await api.post(`/notes/${user.id}`, {
      title,
      description,
      tags,
      links,
    });
    alert("Nota criada com Sucesso!");
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>

            <ButtonText title="voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observacoes"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links uteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}

            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNowNote} />
        </Form>
      </main>
    </Container>
  );
}
