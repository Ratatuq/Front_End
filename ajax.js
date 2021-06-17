"use strict"

let female = 0;
let male = 0;
fetch('https://randomuser.me/api/?results=10')
    .then(value => value.json())
    .then(({ results }) => results.forEach(
        ({
            phone,
            name: { first, last },
            location: { city, country, postcode, street: { number, name } },
            picture: { large, medium },
            login: { username },
            gender,
            registered: { date },
            email,
            dob: { date: dateOfBithday },
            cell
        }) => {
            if (gender == "male") {
                male++;
            } else female++;

            new Test(phone, first, last, location, city, postcode, country, number, name, large, medium,
                username, gender, date, email, dateOfBithday, cell, ".parent").render()

        }))
    .then(funcShow)
    .then(search)

class Test {
    constructor(phone, first, last, location, city, postcode, country, number, name, large, medium,
        username, gender, date, email, dateOfBithday, cell, parent) {
        this.firstName = first;
        this.lastName = last;
        this.username = username;
        this.phone = phone;
        this.location = country;
        this.addressNumber = number;
        this.addressName = name;
        this.birthday = dateOfBithday.slice(0, 10).replace(/-/g, "/");
        this.registered = date.slice(0, 10).replace(/-/g, "/");
        this.city = city;
        this.email = email;
        this.zipcode = postcode;
        this.cell = cell;
        this.gender = gender;
        this.pictureLarge = large;
        this.pictureMedium = medium;
        this.ParentSelector = document.querySelector(parent);
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
                        <div class="main_block">
                        <button class="accordion">
                            <!--Верхняя часть-->
                            <div class="row PeoplePreview" class="findname">
                                <img class="PeopleImg" src="${this.pictureMedium}">
                                <div class="col">${this.lastName}</div>
                                <div class="col" id = "name">${this.firstName}</div>
                                <div class="col">${this.username}</div>
                                <div class="col">${this.phone}</div>
                                <div class="col">${this.location}</div>
                        </button>
                        <div class="panel">
                            <!--Развернутый аккордеон-->
                            <table class="table table-borderless">
                                <tbody class="tablefull">
                                    <tr>
                                        <td><span class="boldfont firstname">${this.firstName}</span>${(this.gender) == 'male' ? '<i class="fa fa-male" aria-hidden="true"></i>' : '<i class="fa fa-female" aria-hidden="true"></i>' }</i>
                                        </td>
                                        <tr>
                                            <td><span class="boldfont">Username </span><span>${this.username}</span></td>
                                            <td><span class="boldfont">Address </span><span>${this.addressName} ${this.addressNumber}</span></td>
                                            <td><span class="boldfont">Birthday </span><span>${this.birthday}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span class="boldfont">Registered </span><span>${this.registered}</span></td>
                                            <td><span class="boldfont">City </span><span>${this.city}</span></td>
                                            <td><span class="boldfont">Phone </span><span>${this.phone}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span class="boldfont">Email </span><span>${this.email}</span></td>
                                            <td><span class="boldfont">Zip Code </span><span>${this.zipcode}</span></td>
                                            <td><span class="boldfont">Cell </span><span>${this.cell}</span></td>
                                            <td class="tdpic">
                                                <img class="PeopleImgFull" src="${this.pictureLarge}">
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    `;
        this.ParentSelector.append(element);
    }
}

function showchart() {

    let summary = male + female;
    let summarymale = (male / summary) * 100;
    let summaryfemale = (female / summary) * 100;

    var colors = Highcharts.getOptions().colors,
        categories = [
            'Male',
            'Female'
        ],
        data = [{
                y: summarymale,
                color: colors[1],
                drilldown: {
                    name: 'Male',
                    categories: [],
                    data: []
                }
            },
            {
                y: summaryfemale,
                color: colors[0],
                drilldown: {
                    name: 'Female',
                    categories: [],
                    data: []
                }
            }
        ],
        salaryData = [],
        percentageData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;
    for (i = 0; i < dataLen; i += 1) {
        salaryData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });
    }
    Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                startAngle: -90
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Percentage',
            data: salaryData,
            size: '80%',
            dataLabels: {
                formatter: function() {
                    return this.y > 5 ? this.point.name : null;
                },
            }
        }, {
            name: 'Percentage',
            data: percentageData,
            size: '80%',
            innerSize: '100%',
            dataLabels: {
                formatter: function() {
                    return this.y > 1 ? '<b>' + this.point.name + '</b> ' : null;
                }
            },
            id: 'percentages'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    series: [{}, {
                        id: 'percentages',
                        dataLabels: {
                            enabled: false
                        }
                    }]
                }
            }]
        }
    });
}

function search() {
    const input = document.querySelector('#search')
    const elements = document.querySelectorAll('#name')


    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase()

        if (value !== '') {
            elements.forEach(elem => {
                const parent = elem.closest(".main_block")

                if (elem.innerText.toLowerCase().search(value) === -1) {
                    parent.classList.add("hide")
                } else {
                    parent.classList.remove("hide")
                }
            })
        } else {
            elements.forEach(elem => {
                elem.closest(".main_block").classList.remove("hide")
            })
        }
    })
}

function funcShow() {
    const acc = document.querySelectorAll(".accordion")
    const panel = document.querySelectorAll(".panel")


    const addColor = (value) => {
        value.forEach((value, index) => {
            index % 2 == 0 ? value.classList.add("accordion__even") : value.classList.add("accordion__odd")
        })
    }

    addColor(acc)
    addColor(panel)

    const closeAll = () => {
        acc.forEach(value => {
            if (value.classList.contains("active")) {
                value.classList.remove("active");
            }
            if (value.nextElementSibling.style.maxHeight != null) {
                value.nextElementSibling.style.maxHeight = null
            }
        })
    }

    function func() {

        if (!this.classList.contains("active")) {
            closeAll();
        }

        this.classList.toggle("active");

        const panel = this.nextElementSibling;

        panel.style.maxHeight ? panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + "px"

    }

    acc.forEach(value => value.addEventListener("click", func))
    console.log(male);
    console.log(female);
    showchart();
}