let project_name = "Project Name";
let repo_url = "https://github.com/username/project-name";
let doc_url = "https://documentation.io";
let security_email = "security@example.com";
let enforcement_email = "enforcement@example.com";

let options = {
    project_name, repo_url, doc_url, security_email, enforcement_email
}

let validationMessage = (msg, msgType = null) => {
    let verror = document.createElement("p");
    verror.innerHTML = msg;
    verror.classList.add("v-error");
    verror.classList.add(msgType);
    return verror;
}

let removeValidationMessage = () => {
    let elements = document.querySelectorAll(".v-error");
    [].forEach.call(elements, function(el) {
        console.log("first")
        el.remove();
      });
}

let validateInput = () => {
    let pname = document.getElementById('project_name');
    let repourl = document.getElementById('repo_url');
    let docurl = document.getElementById('doc_url');
    let securityemail = document.getElementById('security_email');
    let enforcementemail = document.getElementById('enforcement_email');
    let errors = {};

    if (!pname.value.toLowerCase()) {
        pname.classList.add('error');
        errors.project_name = true;
        // pname.parentNode.insertBefore(validationMessage("please add a project name", 'pname'), pname.nextSibling);
    } else {
        pname.classList.remove('error');
        // (document.getElementsByClassName('.pname')).remove();
        delete errors?.project_name;
    }

    if (!repourl.value.toLowerCase()) {
        repourl.classList.add('error');
        errors.repo_url = true;
        // repourl.parentNode.insertBefore(validationMessage("Please add repository url", 'repourl'), repourl.nextSibling);
    } else {
        repourl.classList.remove('error');
        // (document.getElementsByClassName('.repourl')).remove();
        delete errors?.repo_url;
    }

    if (!docurl.value.toLowerCase()) {
        docurl.classList.add('error');
        errors.doc_url = true;
        // docurl.parentNode.insertBefore(validationMessage("Please add documentation url", 'docurl'), docurl.nextSibling);
    } else {
        docurl.classList.remove('error');
        // (document.getElementsByClassName('.docurl')).remove();
        delete errors?.doc_url;
    }

    // if (!securityemail.value.toLowerCase()) {
    //     securityemail.classList.add('error');
    //     errors.security_email = "please add a documentation url";
    // } else {
    //     securityemail.classList.remove('error');
    //     delete errors?.security_email;
    // }

    // if (!enforcementemail.value.toLowerCase()) {
    //     enforcementemail.classList.add('error');
    //     errors.enforcement_email = "please add a documentation url";
    // } else {
    //     enforcementemail.classList.remove('error');
    //     delete errors?.enforcement_email;
    // }

    return Object.keys(errors).length !== 0;
}

let submitForm = () => {

    removeValidationMessage();

    let pname = document.getElementById('project_name');
    let repourl = document.getElementById('repo_url');
    let docurl = document.getElementById('doc_url');
    let securityemail = document.getElementById('security_email');
    let enforcementemail = document.getElementById('enforcement_email');

    if (validateInput()) {
        showToast("Validation error, please fill complete form"); 
        return;
    } 

    options = {
        project_name: pname.value,
        repo_url: repourl.value,
        doc_url: docurl.value,
        security_email: securityemail.value,
        enforcement_email: enforcementemail.value,
    }

    generateContributingFileContent();
    generateCodeOfConductFileContent();
}

let generateContributingMDContent = (e) => {
    let div = document.getElementById('contributing');
    if (e.checked) {
        let msg = contributingFileMDContent();
        div.innerHTML = msg;
        div.classList.add('markdown-view');
        div.classList.remove('html-view');
    } else {
        div.classList.add('html-view');
        div.classList.remove('markdown-view');
        generateContributingFileContent();
    }
}

let generateCodeOfConductMDContent = (e) => {
    let div = document.getElementById('code_of_conduct');
    if (e.checked) {
        let msg = codeOfConductFileMDContent();
        div.innerHTML = msg;
        div.classList.add('markdown-view');
        div.classList.remove('html-view');
    } else {
        div.classList.add('html-view');
        div.classList.remove('markdown-view');
        generateCodeOfConductFileContent();
    }
}


let generateContributingFileContent = () => {
    let msg = contributingFileHtmlContent(options);

    let md = new markdownit()

    let htmlContent = md.render(msg)

    let div = document.getElementById('contributing');
    div.innerHTML = htmlContent;
    div.classList.add('html-view');
    div.classList.remove('markdown-view');
}

// CONTRIBUTING.md File Raw Content
let contributingFileHtmlContent = (options) => {
    let content = `
# Contributing to ${options.project_name}

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)


## Code of Conduct

This project and everyone participating in it is governed by the
[${options.project_name} Code of Conduct](${options.repo_url}/blob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to [${options.security_email}](mailto:${options.security_email}).


## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](${options.doc_url}).

Before you ask a question, it is best to search for existing [Issues](${options.repo_url}/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](${options.repo_url}/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice 
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](${options.doc_url}). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](${options.repo_url}/issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
- Stack trace (Traceback)
- OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
- Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
- Possibly your input and the output
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?


#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to .

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](${options.repo_url}/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as needs-repro. Bugs with the needs-repro tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked needs-fix, as well as possibly other tags (such as critical), and the issue will be left to be [implemented by someone](#your-first-code-contribution).


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for ${options.project_name}, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](${options.doc_url}) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](${options.repo_url}/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](${options.repo_url}/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. <!-- this should only be included if the project has a GUI -->
- **Explain why this enhancement would be useful** to most ${options.project_name} users. You may also want to point out the other projects that solved it better and which could serve as inspiration.


## Attribution
This template is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!
    `;

    return content;
}

// CONTRIBUTING.md file md content
let contributingFileMDContent = () => {
    let content = `
# Contributing to ${options.project_name} <br/><br/>

First off, thanks for taking the time to contribute! ❤️<br/><br/>

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉<br/><br/>

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:<br/><br/>
> - Star the project<br/><br/>
> - Tweet about it<br/><br/>
> - Refer this project in your project's readme<br/><br/>
> - Mention the project at local meetups and tell your friends/colleagues<br/><br/>

## Table of Contents<br/><br/>

- [Code of Conduct](#code-of-conduct)<br/><br/>
- [I Have a Question](#i-have-a-question)<br/><br/>
- [I Want To Contribute](#i-want-to-contribute)<br/><br/>
- [Reporting Bugs](#reporting-bugs)<br/><br/>
- [Suggesting Enhancements](#suggesting-enhancements)<br/><br/>


## Code of Conduct<br/><br/>

This project and everyone participating in it is governed by the [${options.project_name} Code of Conduct](${options.repo_url}/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [${options.security_email}](mailto:${options.security_email}). <br/><br/>


## I Have a Question<br/><br/>

> If you want to ask a question, we assume that you have read the available [Documentation](${options.doc_url}).<br/><br/>

Before you ask a question, it is best to search for existing [Issues](${options.repo_url}/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.<br/><br/>

If you then still feel the need to ask a question and need clarification, we recommend the following:<br/><br/>

- Open an [Issue](${options.repo_url}/issues/new).<br/><br/>
- Provide as much context as you can about what you're running into.<br/><br/>
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.<br/><br/>

We will then take care of the issue as soon as possible.<br/><br/>

## I Want To Contribute<br/><br/>

> ### Legal Notice <br/><br/>
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.<br/><br/>

### Reporting Bugs<br/><br/>

#### Before Submitting a Bug Report<br/><br/>

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.<br/><br/>

- Make sure that you are using the latest version.<br/><br/>
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](${options.doc_url}). If you are looking for support, you might want to check [this section](#i-have-a-question)).<br/><br/>
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](${options.repo_url}/issues?q=label%3Abug).<br/><br/>
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.<br/><br/>
- Collect information about the bug:<br/><br/>
- Stack trace (Traceback)<br/><br/>
- OS, Platform and Version (Windows, Linux, macOS, x86, ARM)<br/><br/>
- Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.<br/><br/>
- Possibly your input and the output<br/><br/>
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?<br/><br/>


#### How Do I Submit a Good Bug Report?<br/><br/>

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to .<br/><br/>

We use GitHub issues to track bugs and errors. If you run into an issue with the project:<br/><br/>

- Open an [Issue](${options.repo_url}/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)<br/><br/>
- Explain the behavior you would expect and the actual behavior.<br/><br/>
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.<br/><br/>
- Provide the information you collected in the previous section.<br/><br/>

Once it's filed:<br/><br/>

- The project team will label the issue accordingly.<br/><br/>
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as needs-repro. Bugs with the needs-repro tag will not be addressed until they are reproduced.<br/><br/>
- If the team is able to reproduce the issue, it will be marked needs-fix, as well as possibly other tags (such as critical), and the issue will be left to be [implemented by someone](#your-first-code-contribution).<br/><br/>


### Suggesting Enhancements<br/><br/>

This section guides you through submitting an enhancement suggestion for ${options.project_name}, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.<br/><br/>

#### Before Submitting an Enhancement<br/><br/>

- Make sure that you are using the latest version.<br/><br/>
- Read the [documentation](${options.doc_url}) carefully and find out if the functionality is already covered, maybe by an individual configuration.<br/><br/>
- Perform a [search](${options.repo_url}/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.<br/><br/>
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.<br/><br/>

#### How Do I Submit a Good Enhancement Suggestion?<br/><br/>

Enhancement suggestions are tracked as [GitHub issues](${options.repo_url}/issues).<br/><br/>

- Use a **clear and descriptive title** for the issue to identify the suggestion.<br/><br/>
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.<br/><br/>
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.<br/><br/>
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. <br/><br/>
- **Explain why this enhancement would be useful** to most ${options.project_name} users. You may also want to point out the other projects that solved it better and which could serve as inspiration.<br/><br/>

## Attribution<br/><br/>
This template is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!<br/><br/>
    `;

    return content;
}

let generateCodeOfConductFileContent = () => {
    let msg = codeOfConductFileHtmlContent(options);

    let md = new markdownit()

    let htmlContent = md.render(msg)

    document.getElementById('code_of_conduct').innerHTML = htmlContent;
}

let codeOfConductFileHtmlContent = (options) => {
    let content = `
# Code of Conduct

> A code of conduct is a set of rules outlining the social norms and rules and responsibilities of, or proper practices for, an individual, party or organization

## Summary

The ${options.project_name} is dedicated to providing a harassment-free working environment for all, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of any form. All communication should be appropriate for a professional audience including people of many different backgrounds. 

Sexual language and imagery is not appropriate for any communication and/or talks. Be kind and do not insult or put down others. Behave professionally. Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for ${options.project_name}. Staff violating these rules should be reported to an appropriate line manager.

These are the values to which people in the ${options.project_name} community should aspire:

- Be friendly and welcoming
- Be patient
  - Remember that people have varying communication styles and that not everyone is using their native language. (Meaning and tone can be lost in translation.) 
- Be thoughtful
  - Productive communication requires effort. Think about how your words will be interpreted.
  - Remember that sometimes it is best to refrain entirely from commenting. 
- Be respectful
  - In particular, respect differences of opinion. 
- Be charitable
  - Interpret the arguments of others in good faith, do not seek to disagree.
  - When we do disagree, try to understand why. 
- Avoid destructive behavior:
  - Derailing: stay on topic; if you want to talk about something else, start a new conversation.
  - Unconstructive criticism: don't merely decry the current state of affairs; offer—or at least solicit—suggestions as to how things may be improved.
  - Snarking (pithy, unproductive, sniping comments)
  - Discussing potentially offensive or sensitive issues; this all too often leads to unnecessary conflict.
  - Microaggressions: brief and commonplace verbal, behavioral and environmental indignities that communicate hostile, derogatory or negative slights and insults to a person or group. 

People are complicated. You should expect to be misunderstood and to misunderstand others; when this inevitably occurs, resist the urge to be defensive or assign blame. Try not to take offense where no offense was intended. Give people the benefit of the doubt. Even if the intent was to provoke, do not rise to it. It is the responsibility of all parties to de-escalate conflict when it arises. 

## Reporting an incident

Incidents that violate the Code of Conduct are extremely damaging to the ${options.project_name}, and they will not be tolerated. The silver lining is that, in many cases, these incidents present a chance for the offenders, and the teams at large, to grow, learn, and become better. 

> The following should be handled by a line manager who has been informed of the incident

Try to get as much of the incident in written form. The important information to gather include the following:

- Name and team of the participant doing the harassing
- The location in which the incident occurred
- The behavior that was in violation
- The approximate time of the behavior
- The circumstances surrounding the incident
- Other people involved in the incident

Depending on the severity/details of the incident, please follow these guidelines:

- If there is any general threat to staff or any other doubts, summon security or police
- Offer the victim a private place to sit
- Ask "is there a friend or trusted person who you would like to be with you?" (if so, arrange for someone to fetch this person)
- Ask them "how can I help?"
- Provide them with your list of emergency contacts if they need help later
- If everyone is presently physically safe, involve the police or security only at a victim's request

There are also some guidelines as to what not to do as an initial response:

- Do not overtly invite them to withdraw the complaint or mention that withdrawal is OK. This suggests that you want them to do so, and is therefore coercive. "If you're OK with pursuing the complaint" suggests that you are by default pursuing it and is not coercive.
- Do not ask for their advice on how to deal with the complaint. This is a staff responsibility.
- Do not offer them input into penalties. This is the staff's responsibility.

The line manager who is handling the reported offence should find out the following:

- What happened?
- Are we doing anything about it?
- Who is doing those things?
- When are they doing them?

After the above has been identified and discussed, have an appropriate line manager communicate with the alleged harasser. Make sure to inform them of what has been reported about them.

Allow the alleged harasser to give their side of the story. After this point, if the report stands, let the alleged harasser know what actions will be taken against them.

Some things for the staff to consider when dealing with Code of Conduct offenders:

- Warning the harasser to cease their behaviour and that any further reports will result in sanctions
- Requiring that the harasser avoid any interaction with, and physical proximity to, their victim until a resolution or course of action has been decided upon
- Requiring that the harasser not volunteer for future events your organisation runs (either indefinitely or for a certain time period)
- Depending on the severity/details of the incident, requiring that the harasser immediately be sent home
- Depending on the severity/details of the incident, removing a harasser from membership of relevant ${options.project_name} organisations
- Depending on the severity/details of the incident, publishing an account of the harassment and calling for the resignation of the harasser from their responsibilities (usually pursued by people without formal authority: may be called for if the harasser is a team leader, or refuses to stand aside from the conflict of interest)

Give accused staff members a place to appeal to if there is one, but in the meantime the report stands. Keep in mind that it is not a good idea to encourage an apology from the harasser.

It is very important how we deal with the incident publicly. Our policy is to make sure that everyone aware of the initial incident is also made aware that it is not according to policy and that official action has been taken - while still respecting the privacy of individual staff members. When speaking to individuals (those who are aware of the incident, but were not involved with the incident) about the incident it is a good idea to keep the details out.

Depending on the incident, the head of responsible department, or designate, may decide to make one or more public announcements. If necessary, this will be done with a short announcement either during the plenary and/or through other channels. No one other than the head of responsible department or someone delegated authority from them should make any announcements. No personal information about either party will be disclosed as part of this process.

If some members of staff were angered by the incident, it is best to apologise to them that the incident occurred to begin with. If there are residual hard feelings, suggest to them to write an email to the responsible head of department. It will be dealt with accordingly.

## Attribution

This Code of Conduct was adapted from both [Golang](https://golang.org/conduct) and the [Golang UK Conference](http://golanguk.com/conduct/).
`;

    return content;
}

let codeOfConductFileMDContent = () => {
    let content = `
# Code of Conduct<br/><br/>

> A code of conduct is a set of rules outlining the social norms and rules and responsibilities of, or proper practices for, an individual, party or organization.<br/><br/>

## Summary<br/><br/>

The ${options.project_name} is dedicated to providing a harassment-free working environment for all, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of any form. All communication should be appropriate for a professional audience including people of many different backgrounds. <br/><br/>

Sexual language and imagery is not appropriate for any communication and/or talks. Be kind and do not insult or put down others. Behave professionally. Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for ${options.project_name}. Staff violating these rules should be reported to an appropriate line manager.<br/><br/>

These are the values to which people in the ${options.project_name} community should aspire:<br/><br/>

- Be friendly and welcoming<br/><br/>
- Be patient<br/><br/>
&nbsp;&nbsp;&nbsp;- Remember that people have varying communication styles and that not everyone is using their native language. (Meaning and tone can be lost in translation.) <br/><br/>
- Be thoughtful<br/><br/>
&nbsp;&nbsp;&nbsp;- Productive communication requires effort. Think about how your words will be interpreted.<br/><br/>
&nbsp;&nbsp;&nbsp;- Remember that sometimes it is best to refrain entirely from commenting. <br/><br/>
- Be respectful<br/><br/>
&nbsp;&nbsp;&nbsp;- In particular, respect differences of opinion. <br/><br/>
- Be charitable<br/><br/>
&nbsp;&nbsp;&nbsp;- Interpret the arguments of others in good faith, do not seek to disagree.<br/><br/>
&nbsp;&nbsp;&nbsp;- When we do disagree, try to understand why. <br/><br/>
- Avoid destructive behavior:<br/><br/>
&nbsp;&nbsp;&nbsp;- Derailing: stay on topic; if you want to talk about something else, start a new conversation.<br/><br/>
&nbsp;&nbsp;&nbsp;- Unconstructive criticism: don't merely decry the current state of affairs; offer—or at least solicit—suggestions as to how things may be improved.<br/><br/>
&nbsp;&nbsp;&nbsp;- Snarking (pithy, unproductive, sniping comments)<br/><br/>
&nbsp;&nbsp;&nbsp;- Discussing potentially offensive or sensitive issues; this all too often leads to unnecessary conflict.<br/><br/>
&nbsp;&nbsp;&nbsp;- Microaggressions: brief and commonplace verbal, behavioral and environmental indignities that communicate hostile, derogatory or negative slights and insults to a person or group. <br/><br/>

People are complicated. You should expect to be misunderstood and to misunderstand others; when this inevitably occurs, resist the urge to be defensive or assign blame. Try not to take offense where no offense was intended. Give people the benefit of the doubt. Even if the intent was to provoke, do not rise to it. It is the responsibility of all parties to de-escalate conflict when it arises. <br/><br/>

## Reporting an incident<br/><br/>

Incidents that violate the Code of Conduct are extremely damaging to the ${options.project_name}, and they will not be tolerated. The silver lining is that, in many cases, these incidents present a chance for the offenders, and the teams at large, to grow, learn, and become better. <br/><br/>

> The following should be handled by a line manager who has been informed of the incident<br/><br/>

Try to get as much of the incident in written form. The important information to gather include the following:<br/><br/>

- Name and team of the participant doing the harassing<br/><br/>
- The location in which the incident occurred<br/><br/>
- The behavior that was in violation<br/><br/>
- The approximate time of the behavior<br/><br/>
- The circumstances surrounding the incident<br/><br/>
- Other people involved in the incident<br/><br/>

Depending on the severity/details of the incident, please follow these guidelines:<br/><br/>

- If there is any general threat to staff or any other doubts, summon security or police<br/><br/>
- Offer the victim a private place to sit<br/><br/>
- Ask "is there a friend or trusted person who you would like to be with you?" (if so, arrange for someone to fetch this person)<br/><br/>
- Ask them "how can I help?"<br/><br/>
- Provide them with your list of emergency contacts if they need help later<br/><br/>
- If everyone is presently physically safe, involve the police or security only at a victim's request<br/><br/>

There are also some guidelines as to what not to do as an initial response:<br/><br/>

- Do not overtly invite them to withdraw the complaint or mention that withdrawal is OK. This suggests that you want them to do so, and is therefore coercive. "If you're OK with pursuing the complaint" suggests that you are by default pursuing it and is not coercive.<br/><br/>
- Do not ask for their advice on how to deal with the complaint. This is a staff responsibility.<br/><br/>
- Do not offer them input into penalties. This is the staff's responsibility.<br/><br/>

The line manager who is handling the reported offence should find out the following:<br/><br/>

- What happened?<br/><br/>
- Are we doing anything about it?<br/><br/>
- Who is doing those things?<br/><br/>
- When are they doing them?<br/><br/>

After the above has been identified and discussed, have an appropriate line manager communicate with the alleged harasser. Make sure to inform them of what has been reported about them.<br/><br/>

Allow the alleged harasser to give their side of the story. After this point, if the report stands, let the alleged harasser know what actions will be taken against them.<br/><br/>

Some things for the staff to consider when dealing with Code of Conduct offenders:<br/><br/>

- Warning the harasser to cease their behaviour and that any further reports will result in sanctions<br/><br/>
- Requiring that the harasser avoid any interaction with, and physical proximity to, their victim until a resolution or course of action has been decided upon<br/><br/>
- Requiring that the harasser not volunteer for future events your organisation runs (either indefinitely or for a certain time period)<br/><br/>
- Depending on the severity/details of the incident, requiring that the harasser immediately be sent home<br/><br/>
- Depending on the severity/details of the incident, removing a harasser from membership of relevant ${options.project_name} organisations<br/><br/>
- Depending on the severity/details of the incident, publishing an account of the harassment and calling for the resignation of the harasser from their responsibilities (usually pursued by people without formal authority: may be called for if the harasser is a team leader, or refuses to stand aside from the conflict of interest)<br/><br/>

Give accused staff members a place to appeal to if there is one, but in the meantime the report stands. Keep in mind that it is not a good idea to encourage an apology from the harasser.<br/><br/>

It is very important how we deal with the incident publicly. Our policy is to make sure that everyone aware of the initial incident is also made aware that it is not according to policy and that official action has been taken - while still respecting the privacy of individual staff members. When speaking to individuals (those who are aware of the incident, but were not involved with the incident) about the incident it is a good idea to keep the details out.<br/><br/>

Depending on the incident, the head of responsible department, or designate, may decide to make one or more public announcements. If necessary, this will be done with a short announcement either during the plenary and/or through other channels. No one other than the head of responsible department or someone delegated authority from them should make any announcements. No personal information about either party will be disclosed as part of this process.<br/><br/>

If some members of staff were angered by the incident, it is best to apologise to them that the incident occurred to begin with. If there are residual hard feelings, suggest to them to write an email to the responsible head of department. It will be dealt with accordingly.<br/><br/>

## Attribution<br/><br/>

This Code of Conduct was adapted from both [Golang](https://golang.org/conduct) and the [Golang UK Conference](http://golanguk.com/conduct/).<br/><br/>
`;

    return content;
}