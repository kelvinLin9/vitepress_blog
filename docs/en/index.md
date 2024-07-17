---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "jDocs"
  text: "AI Docs Center"
  tagline: 
  # actions:
  #   - theme: brand
  #     text: Setting
  #     link: /settings
  #   - theme: alt
  #     text: Login
  #     target: "_self"
  #     link: "https://account.ypcloud.com/auth/verify/?ReturnURL=http://localhost:5173/jdocs/callback"
# features:
#   - icon: 
#       src: 'https://m3.ypcloud.com/cms/jdi_cards_sphere_cms_fbed0b95d1.png'
#     title: AI Docs
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - icon: 
#       src: "https://cdn.jsdelivr.net/npm/@mdi/svg/svg/abjad-hebrew.svg"
#     title: Group Docs
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: My Docs
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

  <!-- <div class="text-3xl font-bold underline">
    Hello world!!
  </div> -->

<script setup>
import { useData } from 'vitepress'
import Search from "../../src/components/common/Search.vue"
import MD from "../../src/components/common/MD.vue"
import ShortSection from "../../src/components/common/ShortSection.vue"
import Upload from "../../src/components/common/Upload.vue"

const { site } = useData()
const shortData = [
    {
      name: '1',
      url: 'https://m3.ypcloud.com/cms/_76c3bb7054.mp4',
    },
    {
      name: '2',
      url: 'https://m3.ypcloud.com/cms/Smart_City_Summit_2024_122cd5f65f.mp4',
    },
    {
      name: '3',
      url: 'https://m3.ypcloud.com/cms/_ee8ec98a6c.mp4',
    },
    // {
    //   name: '4',
    //   url: 'https://m3.ypcloud.com/cms/Smart_City_Summit_2024_122cd5f65f.mp4',
    // },
    // {
    //   name: '5',
    //   url: 'https://m3.ypcloud.com/cms/_ee8ec98a6c.mp4',
    // }
  ]
</script>

<Search />
<MD />
<!-- <ShortSection 
  :data="shortData"
  :title="'IM TITLE'"
/> -->

### crm://mms

mma: >pvt/crm 

| topic | description | payload | result | note |
| :-----: | :-----------: | :-------: | :------: | :----: |
| crm://log       | query log by vat or uid |{"logtype":"app", "vat": "01478473", "sort": "time:desc", "page": 1, "pageSize": 10}  <br> or <br>{"logtype":"event", "Uid":"ccP1N51y","sort": "x_eventtime:desc", "page": 1, "pageSize": 10}  <br> or <br>  `{"logtype":"login", "Uid":"ccP1N51y"}`        | result = {}       |      |
| crm://search      |search specify field contains keyword             |{ "collection":"members", "search":[  {"field":"name"},  {"field":"company_name"} ], "keyword":"yp", "sort":{ "field":"vat",  "sort":"desc"},  "page":1, "pageSize":10 , "attributes":   " name company_name email vat x_app"}         |result = {}        |      |
|crm://query        | Query with filter and sort             |{"collection": "members",    "filter":[{   "field":"name",   "op": "contansi",   "value":"yp"}],"sort":{ "field":"updatedAt", "sort":"desc"}, "attributes":   " name company_name email vat  x_app", "page":1, "pageSize":10}         | result = {}       |      |
|crm://list       | List records             |`{ "collection": "members", "start": 410, "limit": 30 }`                    |result = {}        |      |
|crm://get       |Get one record             |`{ "collection":"members", "id":"421"}`                                                                                            | result = {}       |      |
<!-- |crm://graphql       |query by graplql string              |{ "collection": "members", "query": "query{members(filters:{and:[{name:{containsi:"YP"}}{vat:{eq:"27962768"}}]} sort:["updatedAt:desc"]){data{id attributes{ name company_name vat email x_app}}}}"         |result = {}        |      |
|crm://hr_apply       |create or update HR apply               |{ "collection": "members", "data": {"name": "姓名","email": "電子郵件", "mobile": "手機", "school": "學校",  "degree": "科系", "x_app": "應徵職務", "x_menu": "備註", "category": 22  }}|result = {}        | check email to create or update     | -->


<!-- {{ $frontmatter.hero }} -->

<Upload />
