<template>
  <div>
    <SideArea>
      <ul class="sidebar-item">
        <li v-for="item of categories" :key="item.link">
          <a :href="'#' + item.link" @click="goto('#' + item.link)">{{
            item.title
          }}</a>
          <ul>
            <li v-for="item2 of item.children" :key="item2.link">
              <a
                :href="'#' + item.link + '-' + item2.link"
                @click="goto('#' + item.link + '-' + item2.link)"
                >{{ item2.title }}</a
              >
              <ul>
                <li v-for="item3 of item2.children" :key="item3.link">
                  <a
                    :href="'#' + item.link + '-' + item2.link + item3.link"
                    @click="
                      goto('#' + item.link + '-' + item2.link + item3.link)
                    "
                    >{{ item3.title }}</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </SideArea>
    <div v-for="item of contents" :key="item.id">
      <DemoCard :ref="item.link" :title="item.title">
        <template v-slot:message>
          <span v-html="item.message"></span>
        </template>
        <template v-slot:code>
          <pre v-highlightjs><code highlight='css'>
            
          <span v-html="item.code"></span>
          </code></pre>
        </template>
        <template v-slot:result>
          <div id="v-model-select" class="demo">
            <span v-for="adjust in item.adjustables" :key="adjust[0]">
              <!-- {{ item.adjustables }} -->
              <select v-model="adjust[1]">
                <option v-for="sel in adjust[3]" :value="sel" :key="sel">
                  {{ sel }}
                </option>
              </select>
              <span>Selected: {{ adjust[1] }}</span>
            </span>
          </div>

          <!-- <iframe ref="result_demo">

            </iframe> -->
          <!-- <span v-html="item.result"></span> -->
        </template>
      </DemoCard>
    </div>
  </div>
</template>

<script>
import DemoCard from "./DemoCard.vue";
import SideArea from "./sidebar/SideArea.vue";
import { KnowledgeData } from "../assets/js/data.js";
import axios from "axios";

export default {
  name: "DemoPage",
  components: {
    SideArea,
    DemoCard,
  },
  props: {
    msg: String,
  },
  methods: {
    goto(link) {
      if (this.$refs[link]) {
        let element = this.$refs[link][0];
        element.$el.scrollIntoView();
      } else {
        console.log(this.$refs);
        console.log(link);
        console.log("link not found");
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/category")
      .then((response) => {
        console.log(response);
        for (let data of response.data) {
          let dataJson = JSON.parse(data);
          this.categories.push(dataJson);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/knowledge/1000/200")
      .then((response) => {
        // let dataGot = response.data
        // console.log(dataGot)

        for (let data of response.data) {
          let dataJson = JSON.parse(data);

          this.contents.push(
            new KnowledgeData(
              dataJson.title,
              dataJson.lv,
              dataJson.link,
              dataJson.message,
              dataJson.code,
              dataJson.result,
              dataJson.adjustables
            )
          );
          // adjustable: (default_value, adjust_range(选项/拉条))
          // adjustable: (100, type1,[min,max])
          // adjustable: (blue, type0,[red, yellow,black,green])
          // for (let adjustable of dataJson.adjustables) {
          // }
        }
        for (let [ind, content] of this.contents.entries()) {
          if (content.code) {
            console.log(content.code);
            this.contents[ind].code = content.code.replace(
              // "color",
              // "ccc" + ind
              ">>0<<",
              "{{this.contents[" + ind + "].adjustables[0][1]}}"
            );
            console.log(content.code);
          }
        }
        console.log(this.contents[0]);
        this.$forceUpdate();
      })
      // for (let adjustable of this.adjustables)
      // .then(() => {
      // })
      .catch((err) => {
        console.log(err);
      });
  },
  data: function () {
    return {
      selected: "desds",
      selections: ["hihi", "desds", "cxsa", "basdc"],
      contents: [
        new KnowledgeData(
          "JS",
          0,
          "#js",
          "<b>信息1</b>",
          `.HalfPixelLine{
              background: repeat-x top left url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'><rect fill='red' x='0' y='0' width='1' height='0.5'/></svg>");
              height: 1px;
              color: >>0<<;
            }`,
          "result",
          [
            ["JS" + "+sel1", "red", 0, ["blue", "red", "yellow", "green"]],
            ["JS" + "+sel2", "jon", 0, ["zas", "zane", "sio"]],
          ]
        ),
        new KnowledgeData("JS语法", 1, "#js-grammer", "信息2"),
        new KnowledgeData("CSS", 0, "#css", "信息3"),
      ],
      categories: [],
    };
  },
  // created() {
  //   console.log(KnowledgeData);
  //   let x = new KnowledgeData("JS",0,  1000);
  //   console.log(x);
  // }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  /* padding: 0; */
}
/* li {
    padding: 0;
    margin: 0;
} */

.sidebar-item {
  text-align: left;
}
.sidebar-item a {
  color: black;
  text-decoration: none;
}
</style>
