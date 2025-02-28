boot

- aplikace se skládá z backendu (JAVA) a frontendu (React)

- backend - základ pro správu uživatele
  - aplikace napojena na postgre databázi, ve které se nachází jedno schéma 'security'
    a tabulka 'user'
    - tabulka obsahuje 5 sloupců (id, first_name, last_name, username a password)
  - pro tabulku napsát entity model pro popis tabulky a sloupců
  - k tomu repository který rozšiřuje výchozí jparepo plus přidává jednu novou metodu 
  - dále servica která využívá repositáře k práci s datama pro logiku controlleru
  - controller pro základní metody
    - metoda získání všech uživatelů (get)
    - metoda získání jednoho uživatele dle id (get)
    - metoda získání jednoho uživatele dle username (get) 
      - (!!! toto je velmi riskantní jelikož username může být stejný pro více uživatelů v případě,
        že není nastavena validace pro kontrolu duplicitních username záznamů které jsou 
        již vytvořeny, ale s pár daty které tam zatím jen mám jsem potřeboval rychlé řešení 
        pro získání uživatele dle username k získání a automatickému vyplnění id pro úpravu 
        uživatele)
    - metoda vytvoření nového uživatele (post)
    - metoda odstranění uživatele (delete)
    - metoda úpravy uživatele (patch)
  - dto pro vstupní data z frontendu v controlleru

- backend - securita
  - výchozí spring security s drobnými úpravami WebSecurityConfig
    - úravy pro csrd, cors a requesty, uprava encode hesla a user detail servica
      pro získání uživatele dle username a následnou kontrolu encodovaného hesla z db 
      s tím co vložil uživatel
  - úprava cors konfigurace pro povoleni metod (get, post..) z frontendu 3000
  - controller pro metodu post pro login (ne dle výchozího login callu který spring securita nabízí)
  - dto pro vstupní data z frontendu při loginu

- frontend 
  - fe v reactu, odebaný výchozí stylování a pouze upraveny jednotlivé komponenty pro čitelnost
  - hlavní komponenta App, na které se nachází login a další externí komponenty pro 
    získání uživatelů/uživatele, odstranění, úpravu, vytvoření
  - základní rozdělení komponnetů dle uživatelů 
    - v případě kdy není přihlášen volají se metody pod výchozím uživatelem (reader)
      ale má pouze přístup k některým komponentám tedy funkcím (pouze seznam uživatelů a nalezení uživatele)
    - v případě přihlášení pod existujícím uživatelem získává k vyhledání uživatelů/uživatele 
      přístup také na úravu, ale pouze sebe sama
    - v případě přihlášení pod adminem získává uživatel kromě vyhledání uživatelů/uživatele
      i možnost vytvořit uživatele, odstranit uživatele a upravit jakéhokoliv uživatele
  - pro volání backendu využit axios

- tabulka z databáze přiložena jako screen v projektu

- v datech se objevuje adminOld uživatel, který jsem vytvářel ještě před 
  implementací security, kdy jsem pak musel řešit encode plain textu z databáze 
  proto má daný prefix aby se stále dal využívat a volat (postman atd)
