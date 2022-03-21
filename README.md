<h1 align=center> 📫  <strong>V361</strong>  📫 </h1>

Sistema feito como desafio para a seletiva de estagiário na <a href="https://virtual360.io">V360</a>

<h2>Descrição</h2>
<p>
    &ensp;&ensp;V361 é um sistema web responsável por permitir ao usuário gerar e organizar diferentes listas de tarefas.
    <br>
    &ensp;&ensp;As funcionalidades do sistema incluem o cadastramento de listas, cadastramento de tarefas, customização das listas e reorganização à escolha do usuário, entre outros.
</p>
<br>
<h2>Requisitos</h2>
<p>
    &ensp;&ensp;O conjunto de Requisitos Funcionais do sistema está listado abaixo, dividido por stack, cada um com sua prioridade definida:
</p>
<table style="width: 100%;">
    <tr>
        <th>ID</th>
        <th>Requisito</th>
        <th>Descrição</th>
        <th>Prioridade</th>
    </tr>
    <tr>
        <td>RF-01</td>
        <td>Cadastro de listas</td>
        <td>Adiciona uma nova lista de tarefas</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-02</td>
        <td>Cadastro de tarefas</td>
        <td>Adiciona uma nova tarefa dentro de uma lista</td>
        <td>Alta</td>
    </tr>
        <td>RF-03</td>
        <td>Expandir lista</td>
        <td>Permite expandir a visulização de uma lista de tarefas específica</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-04</td>
        <td>Editar lista de tarefas</td>
        <td>Permite editar os atributos da lista de tarefas</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-05</td>
        <td>Editar tarefa</td>
        <td>Permite editar os atributos de uma tarefa em uma lista</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-06</td>
        <td>Deletar lista de tarefas</td>
        <td>Permite deletar uma lista de tarefas e todas suas tarefas associadas</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-07</td>
        <td>Deletar tarefa</td>
        <td>Deleta uma tarefa específica de uma lista de tarefas</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-08</td>
        <td>Marcar tarefa</td>
        <td>Permite marcar tarefas concluídas</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-09</td>
        <td>Altera status de tarefas</td>
        <td>Permite alterar os atributos principais de tarefas (data de início/conclusão)</td>
        <td>Alta</td>
    </tr>
    <tr>
        <td>RF-10</td>
        <td>Tags em tarefas</td>
        <td>Permite adicionar e remover tags em tarefas</td>
        <td>Média</td>
    </tr>
    <tr>
        <td>RF-11</td>
        <td>Customizar lista e tarefas</td>
        <td>Permite alterar o estilo da lista de tarefas e tarefas específicas</td>
        <td>Média</td>
    </tr>
    <tr>
        <td>RF-12</td>
        <td>Fixar lista de tarefas</td>
        <td>Permite fixar a visualização de uma ou mais listas de tarefas</td>
        <td>Média</td>
    </tr>
    <tr>
        <td>RF-13</td>
        <td>Barra de progresso</td>
        <td>Cada lista terá sua barra de progresso baseado na finalização de suas tarefas</td>
        <td>Média</td>
    </tr>
    <tr>
        <td>RF-14</td>
        <td>Exportar listas de tarefas</td>
        <td>Permite baixar as listas de tarefas em PDF ou XLSX</td>
        <td>Baixa</td>
    </tr>
</table>

<h2>Processos</h2>
<p>
&ensp;&ensp;A gestão de processos será feita através de um projeto no Github, com os RFs definidos através de issues e organizados conforme o desenvolvimento.
</p>

<h2>Desenvolvimento</h2>
<p>
&ensp;&ensp;Todo o código será versionado neste repositório (tanto backend quanto frontend). A linguagem a ser usada será Javascript, usando o framework <a href="https://nodejs.org/en/">NodeJs</a> no Backend e <a href="https://pt-br.reactjs.org">ReactJs</a> no Frontend. O código deste repositório está organizado em quatro partes:
<ol>
    <li><i>main</i>: branch principal, onde fica o código final testado e aprovado.</li>
    <li><i>develop</i>: branch secundária, onde o código é integrado com as diversas funcionalidades.</li>
    <li><i>feature</i>/: conjunto de branchs que tratam da introdução de funcionalidades.</li>
    <li><i>hotfix</i>/: conjunto de branchs que tratam da resolução de problemas que surgiram com as <i>features</i>.</li>
</ol>
</p>
