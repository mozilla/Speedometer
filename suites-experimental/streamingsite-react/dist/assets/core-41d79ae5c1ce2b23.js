"use strict";(self.webpackChunkstreamingsite=self.webpackChunkstreamingsite||[]).push([[111],{2042(e,t,a){a.d(t,{P:()=>h,H:()=>c});var n=a(1663),i=a(1178),r=a(8979),l=a(7934);let s={Stream:{fields:{freeformTags:{merge:!1}}}};var o=a(9654);let d=null;function c(){return d}function h(){let e,t=new n.R({link:((e=new r.z({uri:"https://gql.streamingsite.test/gql",fetch:l.c,batchMax:30})).batcher.batcher.batchInterval=0,e),cache:new i.D({typePolicies:function(e){let t={...s};for(let[a,n]of Object.entries(e))t[a]={...t[a],fields:{...t[a]?.fields,...Object.fromEntries(n.map(e=>[e,{merge:!0}]))}};return t}((0,o.c)().gql.policies)}),assumeImmutableResults:!0});return d=t,t}},1906(e,t,a){var n=a(4202);let i=(0,n.J1)`
  query TopNav_CurrentUser {
    currentUser {
      id
      login
      displayName
      profileImageURL(width: 50)
    }
    requestInfo {
      countryCode
    }
  }
`,r=(0,n.J1)`
  query SideNav($input: SideNavInput!, $creatorAnniversariesFeature: Boolean!, $withFreeformTags: Boolean!) {
    sideNav {
      sections {
        edges {
          cursor
          node {
            id
            title {
              fallbackLocalizedTitle
              key
            }
            content {
              edges {
                cursor
                node {
                  ... on Stream {
                    id
                    type
                    viewersCount
                    hasHypeTrain
                    broadcaster {
                      id
                      login
                      displayName
                      profileImageURL(width: 70)
                      broadcastSettings {
                        id
                        title
                      }
                    }
                    game {
                      id
                      slug
                      displayName
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`,l=(0,n.J1)`
  query ChannelShell($login: String!) {
    userOrError(login: $login) {
      ... on User {
        id
        login
        displayName
        primaryColorHex
        profileImageURL(width: 70)
        bannerImageURL
        stream {
          id
          viewersCount
        }
      }
    }
  }
`,s=(0,n.J1)`
  query StreamMetadata($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      displayName
      primaryColorHex
      roles {
        isPartner
        isParticipatingDJ
      }
      profileImageURL(width: 70)
      lastBroadcast {
        id
        title
      }
      stream {
        id
        type
        createdAt
        game {
          id
          slug
          name
        }
      }
    }
  }
`,o=(0,n.J1)`
  query UseViewCount($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      stream {
        id
        viewersCount
      }
    }
  }
`,d=(0,n.J1)`
  query UseLive($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      login
      stream {
        id
        createdAt
      }
    }
  }
`,c=(0,n.J1)`
  query ChannelRoot_AboutPanel($channelLogin: String!, $skipSchedule: Boolean!) {
    user(login: $channelLogin) {
      id
      description
      displayName
      primaryColorHex
      profileImageURL(width: 70)
      followers {
        totalCount
      }
      roles {
        isPartner
        isAffiliate
      }
      channel {
        id
        socialMedias {
          id
          name
          title
          url
        }
      }
      lastBroadcast {
        id
        game {
          id
          displayName
        }
      }
    }
  }
`,h=(0,n.J1)`
  query ChannelPage_SubscribeButton_User($login: String!, $includeExpiredDunning: Boolean!) {
    user(login: $login) {
      id
      displayName
      subscriptionProducts {
        id
        name
        tier
        hasAdFree
      }
    }
  }
`,u=(0,n.J1)`
  query RealtimeStreamTagList($channelLogin: String!) {
    user(login: $channelLogin) {
      id
      stream {
        id
        freeformTags {
          id
          name
        }
      }
    }
  }
`,m=(0,n.J1)`
  query Shelves($imageWidth: Int, $itemsPerRow: Int, $platform: String!, $limit: Int, $requestID: String!, $context: String) {
    shelves(itemsPerRow: $itemsPerRow, platform: $platform, limit: $limit, requestID: $requestID, context: $context) {
      edges {
        node {
          id
          title {
            key
            fallbackLocalizedTitle
          }
          content {
            edges {
              cursor
              node {
                __typename
                ... on Stream {
                  id
                  viewersCount
                  previewImageURL
                  type
                  createdAt
                  broadcaster {
                    id
                    login
                    displayName
                    profileImageURL(width: 70)
                    broadcastSettings {
                      id
                      title
                    }
                    roles {
                      isPartner
                    }
                  }
                  game {
                    id
                    categorySlug
                    name
                    displayName
                  }
                  freeformTags {
                    id
                    name
                  }
                }
                ... on Game {
                  id
                  categorySlug
                  name
                  displayName
                  boxArtURL
                  viewersCount
                }
              }
            }
          }
        }
      }
    }
  }
`;a.d(t,{},{JM:l,Jz:d,Mx:h,lT:m,nW:u,q2:r,sL:o,tT:c,xh:s,y$:i})},7934(e,t,a){new URLSearchParams(location.search).has("debug")&&(globalThis.__gqlBatches=[]);let n=new Map;function i(e,t){n.set(e,t)}function r(e,t){let a=JSON.parse(String(t?.body??"[]")),i=Array.isArray(a)?a:[a],r=i.map(e=>{let t=n.get(e.operationName);return t?{data:t(e.variables??{}),extensions:{operationName:e.operationName}}:{errors:[{message:`no resolver for ${e.operationName}`}]}}),l=JSON.stringify(Array.isArray(a)?r:r[0]);return globalThis.__gqlBatches?.push({ops:i.map(e=>e.operationName),bytes:l.length}),Promise.resolve(new Response(l,{status:200,headers:{"content-type":"application/json"}}))}a.d(t,{C:()=>i,c:()=>r})},1195(e,t,a){var n=a(404),i=a(7934);let r=n.BM,l=new Map(Object.entries(r).map(([e,t])=>[t.roomId,e])),s=Object.keys(r)[0];function o(e){e in r&&(s=e)}function d(e){let t=new Set;for(let a of Object.values(e.files))for(let e of Object.keys(a))t.add(e);for(let a of t)(0,i.C)(a,t=>{let n=function(e){for(let t of["login","channelLogin","channel","userLogin"]){let a=e[t];if("string"==typeof a&&a in r)return a}for(let t of["channelID","channelOwnerID"]){let a=e[t];if("string"==typeof a&&l.has(a))return l.get(a)}let t=e.channelIDs;return Array.isArray(t)&&"string"==typeof t[0]&&l.has(t[0])?l.get(t[0]):null}(t)??s;return e.files[n]?.[a]??e.files.global[a]??e.files[s]?.[a]??null})}a.d(t,{Ac:()=>d,Fh:()=>o})},713(e,t,a){var n=a(6540),i=a(4113);let r=!1;function l(){r=!0}function s(){return r?(0,i.s)("ssr-chat-rendered"):Promise.resolve()}function o({messages:e}){return(0,n.useEffect)(()=>{r&&(r=!1,(0,i.W)("chat-rendered"))},[e]),null}a.d(t,{SN:()=>o,bA:()=>s,bt:()=>l})},4480(e,t,a){var n=a(2028);let i=()=>({login:null,displayName:null});function r(e){i=e}let l=/[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDFFF]/g,s=/\s/,o=/[.,!?;:]/,d=/^([a-z]+)(\d+)$/i,c=/^(?:https?:\/\/)?(?:clips\.twitch\.tv\/|(?:www\.|m\.)?twitch\.tv\/[\w-]+\/clip\/)([\w-]+)(?:[/?#]\S*)?$/i,h=/^(?:https?:\/\/)?(?:www\.|m\.)?twitch\.tv\/videos\/(\d+)(?:[/?#]\S*)?$/i,u=/^(https?:\/\/)?((?:[a-z0-9][a-z0-9-]*\.)+[a-z]{2,10})(?::\d{1,5})?(\/[\w./#%&@()+=:?~-]*[\w/#%&@()+=~-])?\/?$/i,m=/^([^\w@]*)@(\w{1,25})/,p={cheer:!0,doodlecheer:!0,biblethump:!0,cheerwhal:!0,corgo:!0,party:!0,scoops:!0,shamrock:!0,uni:!0};function g(e){return{type:n.X.Text,content:e}}function f(e,t){return t?[e,g(t)]:[e]}function x(e){let t=[];for(let a of e){let e=t[t.length-1];a.type===n.X.Text&&e&&e.type===n.X.Text?t[t.length-1]=g(e.content+a.content):t.push(a)}return t}function v(e){let t=e.body.match(l)??[],a=i(),r=function(e,t){let a=[],n=0;for(let i of function(e){let t=e.slice().sort((e,t)=>e.startIndex-t.startIndex),a=[];for(let e of t){let t=a[a.length-1];if(t&&e.startIndex<=t.endIndex+1)for(let a of(t.endIndex=Math.max(t.endIndex,e.endIndex),Object.keys(e.categories)))t.categories[a]=Math.max(t.categories[a]||0,e.categories[a]);else a.push({startIndex:e.startIndex,endIndex:e.endIndex,categories:{...e.categories}})}return a}(t)){if(i.startIndex>=e)break;i.startIndex>n&&a.push({start:n,end:i.startIndex-1,categories:null});let t=Math.min(i.endIndex,e-1);a.push({start:i.startIndex,end:t,categories:i.categories}),n=t+1}return n<e&&a.push({start:n,end:e-1,categories:null}),a}(t.length,e.flags),v=[];for(let i of r){let r=function(e,t,a,i,r){let l=e=>{if(e.word){for(let t of(e.gap&&e.parts.push(g(e.gap)),e.gap="",function(e,t,a,i,r){let l=e.length;if(Object.prototype.hasOwnProperty.call(a,t)){var s;let i;return[{type:n.X.Emote,content:{alt:e,emoteID:a[t].id,images:(s=a[t].id,i=`data/assets/emotes/${s}/`,{"1x":`${i}1.png`,"2x":`${i}2.png`,"4x":`${i}3.png`})}}]}let x=d.exec(e);if(x&&i>0&&!0===p[x[1].toLowerCase()])return[{type:n.X.Cheer,content:{alt:e,amount:parseInt(x[2],10),prefix:x[1]}}];if(l>3&&-1!==e.indexOf(".")){let t=l;for(;t>0&&o.test(e.charAt(t-1));)t--;let a=e.slice(0,t),i=e.slice(t),r=c.exec(a);if(r)return f({type:n.X.ClipLink,content:{slug:r[1],url:a}},i);let s=h.exec(a);if(s)return f({type:n.X.VideoLink,content:{videoID:s[1],url:a}},i);let d=u.exec(a);if(d){let e=d[1]?a:`https://${a}`;return f({type:n.X.Link,content:{displayText:a,url:e}},i)}}let v=-1!==e.indexOf("@")?m.exec(e):null;if(v){let t=[],a=v[2],i=a.toLowerCase(),l=1*(null!==r.login&&i===r.login.toLowerCase()||null!==r.displayName&&i===r.displayName.toLowerCase());v[1]&&t.push(g(v[1])),t.push({type:n.X.Mention,content:{recipient:a,currentUserMentionRelation:l}});let s=e.slice(v[0].length);return s&&t.push(g(s)),t}return[g(e)]}(e.word,e.wordStart,a,i,r)))e.parts.push(t);e.word=""}},v=e.reduce((a,n,i)=>{if(s.test(n))return l(a),a.gap+=n,a;a.word||(a.wordStart=t+i),a.word+=n;let r=e[i+1];if(void 0!==r&&o.test(r)&&"@"===a.word.charAt(0)){let t=e[i+2];(void 0===t||s.test(t))&&l(a)}return a},{parts:[],word:"",wordStart:t,gap:""});return l(v),v.gap&&v.parts.push(g(v.gap)),x(v.parts)}(t.slice(i.start,i.end+1),i.start,e.emotes,e.bits,a);if(i.categories)v.push({type:n.X.FlaggedSegment,content:{categories:i.categories,parts:r}});else for(let e of r)v.push(e)}return x(v)}a.d(t,{bT:()=>function e(t){return t.some(t=>t.type===n.X.Mention?1===t.content.currentUserMentionRelation:t.type===n.X.FlaggedSegment&&e(t.content.parts))},qw:()=>v,sK:()=>r})},2028(e,t,a){var n,i,r=((n={}).Message="message",n.Action="action",n.Subscription="subscription",n.Resubscription="resubscription",n.SubGift="subgift",n.SubMysteryGift="submysterygift",n.GiftPaidUpgrade="giftpaidupgrade",n.Raid="raid",n.Announcement="announcement",n.BitsBadgeTier="bitsbadgetier",n.Ritual="ritual",n.Notice="notice",n.Moderation="moderation",n.ChatCleared="chatcleared",n.RoomMods="roommods",n.SlowMode="slowmode",n.SubsOnlyMode="subsonlymode",n.FollowersOnlyMode="followersonlymode",n.EmoteOnlyMode="emoteonlymode",n.R9KMode="r9kmode",n.Connected="connected",n.Disconnected="disconnected",n.Reconnect="reconnect",n.LiveSeparator="liveseparator",n.Welcome="welcome",n),l=((i={})[i.Text=0]="Text",i[i.Mention=1]="Mention",i[i.Link=2]="Link",i[i.Emote=3]="Emote",i[i.Cheer=4]="Cheer",i[i.ClipLink=5]="ClipLink",i[i.VideoLink=6]="VideoLink",i[i.FlaggedSegment=7]="FlaggedSegment",i);a.d(t,{X:()=>l,Z:()=>r})},5557(e,t,a){var n=a(4848),i=a(5338),r=a(8797),l=a(3890),s=a(2042),o=a(9765),d=a(9654),c=a(625),h=a(6540),u=a(4976),m=a(7767),p=a(8154),g=a(7538),f=a(1906),x=a(1195),v=a(9152),b=a(643),w=a(9391),y=a(4113);function j({stream:e}){let{login:t,displayName:a,profileImageURL:i,broadcastSettings:r}=e.broadcaster;return(0,n.jsxs)(w.PE,{as:"article",className:"stream-card","data-a-target":"stream-card",children:[(0,n.jsxs)(u.N_,{className:"stream-card__thumb tw-link-plain",to:`/${t}`,"data-a-target":"preview-card-image-link",children:[(0,n.jsx)(w.L_,{src:(0,v.EB)(e.previewImageURL,440,248),alt:r.title,loading:"lazy"}),(0,n.jsx)(w.PE,{className:"stream-card__tag stream-card__tag--live",as:"span",children:"LIVE"}),(0,n.jsx)(w.PE,{className:"stream-card__tag stream-card__tag--viewers",as:"span",children:(0,b.t)("viewers.count",{count:e.viewersCount})})]}),(0,n.jsxs)(w.PE,{className:"stream-card__meta",children:[(0,n.jsx)(w.eu,{src:i,size:40,alt:a}),(0,n.jsxs)(w.PE,{minWidth:"0",children:[(0,n.jsx)(w.Ni,{fontSize:4,bold:!0,lines:2,children:r.title}),(0,n.jsx)(u.N_,{to:`/${t}`,className:"tw-link-plain",children:(0,n.jsx)(w.Ni,{fontSize:3,color:"text-alt-2",ellipsis:!0,children:a})}),(0,n.jsx)(w.Ni,{fontSize:3,color:"text-alt-2",ellipsis:!0,children:e.game.name}),(0,n.jsx)(w.PE,{display:"flex",gap:.5,flexWrap:"wrap",margin:{top:.5},children:e.freeformTags.slice(0,2).map(e=>(0,n.jsx)(w.PE,{className:"channel-tag",as:"span",children:e.name},e.id))})]})]})]})}function $({game:e}){return(0,n.jsxs)(w.PE,{as:"article",className:"category-card","data-a-target":"category-card",children:[(0,n.jsx)(u.N_,{className:"category-card__art tw-link-plain",to:`/directory/category/${e.categorySlug??e.id}`,children:(0,n.jsx)(w.L_,{src:e.boxArtURL,alt:e.name,loading:"lazy"})}),(0,n.jsxs)(w.PE,{margin:{top:.5},children:[(0,n.jsx)(w.Ni,{fontSize:4,bold:!0,ellipsis:!0,children:e.name}),(0,n.jsx)(w.Ni,{fontSize:3,color:"text-alt-2",children:(0,b.t)("home.viewersOnCategory",{count:e.viewersCount})})]})]})}let S=(0,g.U)(f.lT,{options:()=>({variables:{imageWidth:50,itemsPerRow:6,platform:"web",limit:3,requestID:"JIRA-VXP-2397",context:"front_page"}})})(function({data:e}){let t=e.shelves?.edges??[],a=!!e.shelves;return(0,h.useEffect)(()=>{a&&(0,y.W)("home-ready")},[a]),(0,n.jsx)(n.Fragment,{children:t.map(({node:e})=>(0,n.jsxs)(w.PE,{as:"section",className:"shelf","data-a-target":"shelf",children:[(0,n.jsx)(w.PE,{className:"shelf__header",children:(0,n.jsx)(w.Ni,{as:"h2",fontSize:6,bold:!0,children:e.title.fallbackLocalizedTitle})}),(0,n.jsx)(w.PE,{className:"shelf__row",children:e.content.edges.map(({node:e},t)=>"Game"===e.__typename?(0,n.jsx)($,{game:e},`${e.id}-${t}`):(0,n.jsx)(j,{stream:e},`${e.id}-${t}`))})]},e.id))})});var N=a(6477),E=a(542),P=a(4319),z=a(5437);function k({stream:e}){let{login:t,displayName:a,profileImageURL:i}=e.broadcaster;return(0,n.jsx)(w.PE,{className:"side-nav-card","data-test-selector":"side-nav-card",children:(0,n.jsx)(w.PE,{className:"tw-tooltip-wrapper",children:(0,n.jsx)(w.m_,{label:a,children:(0,n.jsx)(u.N_,{className:"side-nav-card__link tw-link-plain",to:`/${t}`,"data-a-target":"side-nav-channel","data-login":t,children:(0,n.jsxs)(w.PE,{display:"flex",alignItems:"center",fullWidth:!0,children:[(0,n.jsx)(w.PE,{className:"side-nav-card__avatar",display:"flex",alignItems:"center",children:(0,n.jsx)(w.PE,{display:"flex",as:"figure",margin:0,children:(0,n.jsx)(w.PE,{className:"tw-avatar-ring",display:"flex",borderRadius:"full",children:(0,n.jsx)(w.PE,{display:"flex",borderRadius:"full",overflow:"hidden",children:(0,n.jsx)(w.eu,{src:i,size:30,alt:a})})})})}),(0,n.jsxs)(w.PE,{className:"side-nav-card__meta",display:"flex",flexDirection:"column",margin:{left:1},children:[(0,n.jsx)(w.PE,{className:"side-nav-card__title","data-a-target":"side-nav-title",children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",children:(0,n.jsx)(w.VJ,{fontSize:4,bold:!0,color:"text-base",ellipsis:!0,children:a})})}),(0,n.jsx)(w.PE,{className:"side-nav-card__subtitle","data-a-target":"side-nav-game-title",children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",children:(0,n.jsx)(w.VJ,{fontSize:4,color:"text-alt-2",ellipsis:!0,children:e.game.displayName})})})]}),(0,n.jsxs)(w.PE,{className:"side-nav-card__live-status",display:"flex",alignItems:"center","data-a-target":"side-nav-live-status",children:[(0,n.jsx)(w.PE,{className:"side-nav-card__live-dot-wrapper",display:"flex",alignItems:"center",children:(0,n.jsx)(w.PE,{className:"side-nav-card__live-dot"})}),(0,n.jsx)(w.PE,{margin:{left:.5},children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",children:(0,n.jsx)(w.VJ,{fontSize:4,color:"text-base",children:(0,v.Ro)(e.viewersCount)})})})]})]})})})})})}function C({title:e,streams:t,collapsed:a,action:i}){return(0,n.jsxs)(w.PE,{className:"side-nav-section",as:"section","aria-label":e,children:[(0,n.jsx)(w.PE,{className:"side-nav-header",display:"flex",alignItems:"center",justifyContent:"space-between",padding:{x:1,y:1},children:(0,n.jsx)(w.Ni,{className:"side-nav-header__title",as:"h3",fontSize:4,bold:!0,transform:"uppercase",color:"text-alt-2",children:e})}),(0,n.jsx)(w.PE,{className:"side-nav-section__list",role:"group",children:t.map((e,t)=>(0,n.jsx)(k,{stream:e,collapsed:a},`${e.id}-${t}`))}),i]})}function L(){let e=(0,l.wA)(),t=(0,l.d4)(e=>e.ui.sideNavCollapsed),a=(0,l.d4)(e=>e.ui.recommendedExpanded),{data:i}=(0,E.I)(f.q2,{variables:{input:{recommendationContext:{platform:"web"}},creatorAnniversariesFeature:!1,withFreeformTags:!1}}),r=(0,h.useMemo)(()=>(i?.sideNav.sections.edges??[]).flatMap(e=>e.node.content.edges.map(e=>e.node)).filter(e=>e.broadcaster),[i]),s=a?r:r.slice(0,13);return(0,n.jsxs)(w.PE,{as:"nav",className:`side-nav ${t?"side-nav--collapsed":"side-nav--expanded"}`,"data-a-target":"side-nav","aria-label":"Primary Navigation",children:[(0,n.jsxs)(w.PE,{className:"side-nav-header",display:"flex",alignItems:"center",justifyContent:"space-between",padding:1,children:[(0,n.jsx)(w.Ni,{className:"side-nav-header__title",as:"h2",fontSize:5,bold:!0,children:(0,b.t)("nav.forYou")}),(0,n.jsx)(w.m_,{label:t?(0,b.t)("nav.expand"):(0,b.t)("nav.collapse"),children:(0,n.jsx)(w.a2,{label:t?(0,b.t)("nav.expand"):(0,b.t)("nav.collapse"),onClick:()=>e((0,P.n)()),"data-a-target":"side-nav-arrow",children:(0,n.jsx)(w.Ah,{path:t?z.Z.expand:z.Z.collapse})})})]}),(0,n.jsx)(w.PE,{className:"side-nav-sections",display:"flex",flexDirection:"column",children:(0,n.jsx)(C,{title:(0,b.t)("nav.recommended"),streams:s,collapsed:t,action:r.length>13||a?(0,n.jsx)(w.PE,{padding:{x:1,y:1},children:(0,n.jsx)(w.Sl,{children:(0,n.jsx)("button",{className:"side-nav__show-more","data-a-target":"side-nav-show-more-button",onClick:()=>e((0,P.Z)()),children:(0,n.jsx)(w.Ni,{fontSize:4,bold:!0,color:"text-link",children:a?(0,b.t)("nav.showLess"):(0,b.t)("nav.showMore")})})})}):null})})]})}function _(){let{login:e}=(0,m.g)();return(0,n.jsxs)(w.PE,{className:"signup-banner",as:"aside","data-a-target":"signup-banner",display:"flex",alignItems:"center",children:[(0,n.jsx)(w.eu,{src:"data/assets/avatars/lumenfall/70.png",size:48,alt:""}),(0,n.jsx)(w.PE,{flexGrow:1,margin:{left:1},children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",children:(0,n.jsx)(w.VJ,{fontSize:5,bold:!0,color:"text-base",children:(0,b.t)("signup.banner",{name:e??"StreamingSite"})})})}),(0,n.jsx)(w.Sl,{margin:{x:1},children:(0,n.jsx)(w.SS,{appearance:"overlay",size:"large",children:(0,n.jsx)(w.PE,{padding:{x:1},children:(0,n.jsx)(w.VJ,{fontSize:5,bold:!0,children:(0,b.t)("nav.signup")})})})}),(0,n.jsx)(w.K0,{path:z.Z.close,label:"Dismiss",appearance:"overlay"})]})}function I({icon:e,label:t,appearance:a}){return(0,n.jsx)(w.m_,{label:t,children:(0,n.jsx)(w.a2,{label:t,appearance:a??"text",children:(0,n.jsx)(w.Ah,{path:z.Z[e]})})})}let M=["Categories","Channels","Tags"],T=["Channel","Creator Dashboard","Drops & Rewards","Subscriptions","Settings","Log Out"];function A(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(w.PE,{className:"top-nav__search-suggestions",role:"listbox",hidden:!0,"data-a-target":"search-suggestions",display:"none",children:M.map(e=>(0,n.jsx)(w.PE,{role:"option",padding:{x:1,y:.5},children:(0,n.jsxs)(w.PE,{display:"flex",alignItems:"center",gap:1,children:[(0,n.jsx)(w.Ah,{path:z.Z.search,size:16}),(0,n.jsx)(w.VJ,{fontSize:4,children:e})]})},e))}),(0,n.jsx)(w.PE,{className:"top-nav__user-menu",role:"menu",hidden:!0,"data-a-target":"user-menu",display:"none",children:T.map(e=>(0,n.jsx)(w.PE,{role:"menuitem",padding:{x:1,y:.5},children:(0,n.jsxs)(w.PE,{as:"a",display:"flex",alignItems:"center",gap:1,children:[(0,n.jsx)(w.PE,{display:"flex",children:(0,n.jsx)(w.Ah,{path:z.Z.person,size:16})}),(0,n.jsx)(w.VJ,{fontSize:4,children:e})]})},e))})]})}function R({to:e,children:t}){return(0,n.jsx)(w.Sl,{padding:{x:1},children:(0,n.jsx)(u.N_,{to:e,className:"top-nav__link tw-link-plain","data-a-target":"top-nav-link",children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",height:"3rem",children:(0,n.jsx)(w.Ni,{fontSize:5,bold:!0,children:t})})})})}function V(){let[e,t]=(0,h.useState)("");return(0,n.jsx)(w.PE,{className:"top-nav__search-container",display:"flex",justifyContent:"center",padding:{x:1},children:(0,n.jsxs)(w.PE,{className:"top-nav__search-box",role:"search",as:"form",onSubmit:e=>e.preventDefault(),children:[(0,n.jsx)("input",{className:"top-nav__search-input",type:"search",autoComplete:"off",placeholder:(0,b.t)("nav.search"),"aria-label":(0,b.t)("nav.search"),"data-a-target":"tw-input",value:e,onChange:e=>t(e.target.value)}),(0,n.jsx)(w.m_,{label:(0,b.t)("nav.search"),children:(0,n.jsx)("button",{className:"top-nav__search-button",type:"submit","aria-label":(0,b.t)("nav.search"),children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",justifyContent:"center",children:(0,n.jsx)(w.Ah,{path:z.Z.search})})})})]})})}function H(){let{data:e}=(0,E.I)(f.y$),t=!!e?.currentUser;return(0,n.jsxs)(w.PE,{as:"nav",className:"top-nav","data-a-target":"top-nav-container",children:[(0,n.jsxs)(w.PE,{className:"top-nav__menu",display:"flex",alignItems:"center",children:[(0,n.jsx)(u.N_,{to:"/",className:"top-nav__logo","aria-label":"StreamingSite home",children:(0,n.jsx)(w.PE,{display:"flex",alignItems:"center",padding:{x:.5},children:(0,n.jsx)(w.Ah,{path:z.Z.logo,size:30})})}),(0,n.jsxs)(w.PE,{display:"flex",alignItems:"center",margin:{left:1},children:[(0,n.jsx)(R,{to:"/",children:(0,b.t)("nav.browse")}),(0,n.jsx)(I,{icon:"menu",label:"More"})]})]}),(0,n.jsx)(V,{}),(0,n.jsxs)(w.PE,{className:"top-nav__menu top-nav__menu--right",display:"flex",alignItems:"center",justifyContent:"flex-end",children:[(0,n.jsx)(w.K0,{path:z.Z.gift,label:"Prime Gaming"}),(0,n.jsx)(w.K0,{path:z.Z.inbox,label:"Notifications"}),t?null:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(w.Sl,{margin:{x:.5},children:(0,n.jsx)(w.SS,{appearance:"secondary","data-a-target":"login-button",children:(0,n.jsx)(w.PE,{padding:{x:.5},children:(0,b.t)("nav.login")})})}),(0,n.jsx)(w.Sl,{margin:{x:.5},children:(0,n.jsx)(w.SS,{appearance:"primary","data-a-target":"signup-button",children:(0,n.jsx)(w.PE,{padding:{x:.5},children:(0,b.t)("nav.signup")})})})]}),(0,n.jsx)(I,{icon:"user",label:"User menu"})]}),(0,n.jsx)(A,{})]})}let F=["Welcome to StreamingSite","Turn on notifications","Your first drop is ready","A channel you may like is live","New features this week","Tips for chat"];function O(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(w.PE,{className:"toast-container",role:"status","aria-live":"polite",position:"fixed",zIndex:3e3}),(0,n.jsxs)(w.PE,{className:"onsite-notifications",role:"dialog",hidden:!0,display:"none","data-a-target":"onsite-notifications",children:[(0,n.jsxs)(w.PE,{display:"flex",justifyContent:"space-between",alignItems:"center",padding:1,children:[(0,n.jsx)(w.VJ,{fontSize:5,bold:!0,children:"Notifications"}),(0,n.jsx)(w.K0,{path:z.Z.close,label:"Close"})]}),F.map((e,t)=>(0,n.jsxs)(w.PE,{display:"flex",alignItems:"center",gap:1,padding:1,children:[(0,n.jsx)(w.eu,{src:"data/assets/avatars/lumenfall/50.png",size:30,alt:""}),(0,n.jsxs)(w.PE,{children:[(0,n.jsx)(w.VJ,{fontSize:4,children:e}),(0,n.jsx)(w.VJ,{fontSize:3,color:"text-alt-2",children:`${t+1}h ago`})]}),(0,n.jsx)(w.PE,{display:"flex",style:{marginLeft:"auto"},children:(0,n.jsx)(w.Ah,{path:z.Z.chevronDown,size:16})})]},e))]}),(0,n.jsx)(w.PE,{className:"modal-root",role:"presentation","data-a-target":"modal-root"}),(0,n.jsx)(w.PE,{className:"popover-root",role:"presentation","data-a-target":"popover-root"}),(0,n.jsx)(w.PE,{className:"shortcuts-dialog",role:"dialog",hidden:!0,display:"none","data-a-target":"shortcuts-dialog",children:[["f","Fullscreen"],["m","Mute"],["t","Theatre mode"],["alt+x","Toggle chat"],["c","Clip"],["space","Play or pause"]].map(([e,t])=>(0,n.jsxs)(w.PE,{display:"flex",justifyContent:"space-between",padding:.5,children:[(0,n.jsx)(w.VJ,{fontSize:4,children:t}),(0,n.jsx)(w.PE,{padding:{x:.5},background:"alt-2",borderRadius:"rounded",children:(0,n.jsx)(w.VJ,{fontSize:3,bold:!0,children:e})})]},e))})]})}let D=(0,N.DU)`
  html, body, #root { height: 100%; }
  *, *::before, *::after { box-sizing: border-box; }
  :root { --signup-banner-height: 8rem; }
  .tw-link-plain:hover { text-decoration: none; }
`,q=[()=>a.e(875).then(a.bind(a,1946)),()=>a.e(890).then(a.bind(a,697)),()=>a.e(20).then(a.bind(a,1897)),()=>a.e(691).then(a.bind(a,5280)),()=>a.e(435).then(a.bind(a,8524)),()=>a.e(608).then(a.bind(a,8285)),()=>a.e(372).then(a.bind(a,2763)),()=>a.e(346).then(a.bind(a,2853)),()=>a.e(374).then(a.bind(a,9665)),()=>a.e(446).then(a.bind(a,4939)),()=>a.e(734).then(a.bind(a,2463)),()=>a.e(342).then(a.bind(a,3789)),()=>a.e(344).then(a.bind(a,7151)),()=>a.e(331).then(a.bind(a,3578)),()=>a.e(370).then(a.bind(a,7981)),()=>a.e(624).then(a.bind(a,4943)),()=>a.e(311).then(a.bind(a,1850)),()=>a.e(107).then(a.bind(a,9922)),()=>a.e(723).then(a.bind(a,6938)),()=>a.e(525).then(a.bind(a,9304)),()=>a.e(476).then(a.bind(a,1575)),()=>a.e(110).then(a.bind(a,6595)),()=>a.e(38).then(a.bind(a,879)),()=>a.e(508).then(a.bind(a,3259)),()=>a.e(439).then(a.bind(a,6436)),()=>a.e(308).then(a.bind(a,9309)),()=>a.e(330).then(a.bind(a,5829)),()=>a.e(463).then(a.bind(a,468)),()=>a.e(174).then(a.bind(a,7783)),()=>a.e(0).then(a.bind(a,5415)),()=>a.e(773).then(a.bind(a,186)),()=>a.e(352).then(a.bind(a,1108))],U=()=>a.e(817).then(a.bind(a,6293)),J=(0,h.lazy)(U),B=Promise.all([U(),Promise.all(q.map(e=>e()))]),W=[{element:(0,n.jsx)(function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(D,{}),(0,n.jsxs)(p.m,{children:[(0,n.jsx)("html",{lang:"en",className:"tw-root--theme-dark"}),(0,n.jsx)("meta",{name:"theme-color",content:"#0e0e10"})]}),(0,n.jsxs)(w.PE,{className:"tw-root",position:"relative",fullHeight:!0,children:[(0,n.jsx)(H,{}),(0,n.jsxs)(w.PE,{className:"root-scrollable","data-a-target":"root-scrollable",children:[(0,n.jsx)(L,{}),(0,n.jsx)(w.PE,{as:"main",className:"root-scrollable__main","data-a-target":"main-page-scrollable-area",children:(0,n.jsx)(m.sv,{})})]}),(0,n.jsx)(_,{}),(0,n.jsx)(O,{})]})]})},{}),children:[{path:"/",element:(0,n.jsx)(function(){return(0,x.Fh)("lumenfall"),(0,n.jsxs)(w.PE,{className:"home-page","data-a-target":"home-page",children:[(0,n.jsx)(p.m,{children:(0,n.jsx)("title",{children:(0,b.t)("home.title")})}),(0,n.jsxs)(u.N_,{className:"home-hero tw-link-plain",to:"/lumenfall","data-a-target":"home-channel-link",children:[(0,n.jsx)(w.L_,{className:"home-hero__image",src:"data/assets/thumbs/lumenfall-1280x360.png",alt:"Lumenfall"}),(0,n.jsxs)(w.PE,{className:"home-hero__meta",children:[(0,n.jsx)(w.Ni,{fontSize:6,bold:!0,children:"Lumenfall"}),(0,n.jsx)(w.Ni,{fontSize:4,color:"text-alt",children:(0,b.t)("viewers.live",{count:24318})})]})]}),(0,n.jsx)(S,{})]})},{})},{path:"/:login",element:(0,n.jsx)(h.Suspense,{fallback:null,children:(0,n.jsx)(J,{})})}]}],G="/"===location.pathname?(0,u.Ys)(W):(0,m.bg)(W,{initialEntries:["/"]});function X(){return(0,n.jsx)(u.pg,{router:G})}var Z=a(4480);!async function(){let e=await (0,d.o)();(0,c.b)(e);let t=(0,o.pq)();(0,Z.sK)(()=>t.getState().session);let a=(0,s.P)(),h=(0,i.H)(document.getElementById("root")),u=(0,y.s)("ssr-home-ready");h.render((0,n.jsx)(l.Kq,{store:t,children:(0,n.jsx)(r.X,{client:a,children:(0,n.jsx)(X,{})})})),await Promise.all([u,B]),window.ssrReady=!0,window.dispatchEvent(new Event("ssr-ready"))}()},9654(e,t,a){var n=a(404),i=a(1195);let r=null;async function l(e){let t=await fetch(new URL(`data/${e}`,document.baseURI));if(!t.ok)throw Error(`${e}: ${t.status}`);return t.json()}async function s(){let e=n.Ci,t=e.filter(e=>e.rate>0),a=Object.keys(n.BM),[s,o,d,c,h,...u]=await Promise.all([l("irc/rooms.json"),l("catalog/badges.json"),l("catalog/emotes.json"),l("gql/global.json"),l("gql/policies.json"),...t.map(e=>l(`irc/${e.name}.json`))]),m=u.slice(0,t.length),p=await Promise.all(a.map(e=>l(`gql/${e}.json`))),g={global:c};return a.forEach((e,t)=>g[e]=p[t]),r={steps:e,rooms:s,badges:o,emotes:d,frames:Object.fromEntries(t.map((e,t)=>[e.name,m[t]])),gql:{files:g,policies:h}},(0,i.Ac)(r.gql),r}function o(){if(!r)throw Error("workload data not loaded");return r}a.d(t,{c:()=>o,o:()=>s})},1358(e,t,a){var n=a(9524);let i=new Set,r=new Map;function l(e){r.set(e.login,e)}function s(e,t){for(let a of i)a.joined.has(e)&&a.schedule(t)}class o extends EventTarget{later(e,t){let a=(0,n.setTimeout)(()=>{this.pending.delete(a),3!==this.readyState&&t()},e);this.pending.add(a)}fire(e,t){t?.call(this,e),this.dispatchEvent(e)}deliver(e){1===this.readyState&&this.fire(new MessageEvent("message",{data:e}),this.onmessage)}reply(e){this.later(0,()=>this.deliver(e))}schedule(e){for(let t of e)this.later(t.at,()=>this.deliver(t.data))}send(e){if(1!==this.readyState)throw new DOMException("WebSocket is not open","InvalidStateError");for(let t of e.split("\r\n"))t&&this.handleClientLine(t)}handleClientLine(e){let t=e.indexOf(" "),a=-1===t?e:e.slice(0,t),n=-1===t?"":e.slice(t+1);switch(a){case"CAP":this.reply(`:tmi.twitch.tv CAP * ACK :${n.replace(/^REQ :/,"")}\r
`);break;case"NICK":{let e=this.nick=n.trim();this.reply(`:tmi.twitch.tv 001 ${e} :Welcome, GLHF!\r
:tmi.twitch.tv 002 ${e} :Your host is tmi.twitch.tv\r
:tmi.twitch.tv 003 ${e} :This server is rather new\r
:tmi.twitch.tv 004 ${e} :-\r
:tmi.twitch.tv 375 ${e} :-\r
:tmi.twitch.tv 372 ${e} :You are in a maze of twisty passages, all alike.\r
:tmi.twitch.tv 376 ${e} :>\r
`);break}case"JOIN":for(let e of n.split(","))this.join(e.trim().replace(/^#/,""));break;case"PART":{let e=n.trim().replace(/^#/,"");this.joined.delete(e);let t=this.nick;this.reply(`:${t}!${t}@${t}.tmi.twitch.tv PART #${e}\r
`);break}case"PING":this.reply(`:tmi.twitch.tv PONG tmi.twitch.tv ${n}\r
`)}}join(e){let t=this.nick,a=r.get(e);this.joined.add(e);let n=a?`${a.roomState} :tmi.twitch.tv ROOMSTATE #${e}\r
`:"";this.reply(`:${t}!${t}@${t}.tmi.twitch.tv JOIN #${e}\r
${n}`),this.reply(`:${t}.tmi.twitch.tv 353 ${t} = #${e} :${t}\r
:${t}.tmi.twitch.tv 366 ${t} #${e} :End of /NAMES list\r
`)}close(e=1e3,t=""){if(3!==this.readyState){for(let e of this.pending)(0,n.clearTimeout)(e);this.pending.clear(),this.readyState=3,i.delete(this),this.fire(new CloseEvent("close",{code:e,reason:t,wasClean:!0}),this.onclose)}}constructor(e){super(),this.CONNECTING=0,this.OPEN=1,this.CLOSING=2,this.CLOSED=3,this.protocol="",this.extensions="",this.binaryType="blob",this.bufferedAmount=0,this.readyState=0,this.onopen=null,this.onmessage=null,this.onerror=null,this.onclose=null,this.nick="",this.joined=new Set,this.pending=new Set,this.url=String(e),i.add(this),this.later(0,()=>{this.readyState=1,this.fire(new Event("open"),this.onopen)})}}function d(e,t){return t?new o(e):new WebSocket(e)}o.CONNECTING=0,o.OPEN=1,o.CLOSING=2,o.CLOSED=3,a.d(t,{Ht:()=>s,KD:()=>d,P3:()=>l})},9524(e,t,a){a.r(t);let n=!1,i=17926128e5,r=1,l=0,s=new Map,o=[],d=!1;function c(){n=!0}function h(){return n}function u(){return n?i:17926128e5+performance.now()}function m(e,t,a){let n=Math.max(0,t||0),o={id:r++,due:i+n,seq:l++,interval:a?Math.max(1,n):null,callback:e};return s.set(o.id,o),d||P(i),o.id}function p(e){void 0!==e&&s.delete(e)}let g=globalThis.setTimeout.bind(globalThis),f=globalThis.clearTimeout.bind(globalThis),x=globalThis.setInterval.bind(globalThis),v=globalThis.clearInterval.bind(globalThis);function b(e,t=0){return n?m(e,t,!1):g(e,t)}function w(e){n?p(e):f(e)}function y(e,t){return n?m(e,t,!0):x(e,t)}function j(e){n?p(e):v(e)}let $="function"==typeof MessageChannel?new MessageChannel:null,S=[];function N(){return new Promise(e=>{S.push(e),$.port2.postMessage(null)})}function E(e){let t=null;for(let a of s.values())!(a.due>e)&&(!t||a.due<t.due||a.due===t.due&&a.seq<t.seq)&&(t=a);return t}async function P(e){if(!d){d=!0;try{for(;;){await N();let t=E(e);if(!t)break;i=Math.max(i,t.due),null===t.interval?s.delete(t.id):(t.due+=t.interval,t.seq=l++);try{t.callback()}catch(e){reportError(e)}}}finally{d=!1}E(i)?P(i):o.splice(0).forEach(e=>e())}}async function z(e){for(;d;)await k();let t=i+e;await P(t),i=t,await k()}function k(){return d||E(i)?new Promise(e=>o.push(e)):Promise.resolve()}function C(){return d||null!==E(i)}$&&($.port1.onmessage=()=>S.shift()?.()),a.d(t,{advance:()=>z,clearInterval:()=>j,clearTimeout:()=>w,enableVirtualTime:()=>c,hasDueTimers:()=>C,isVirtualTime:()=>h,nextTask:()=>N,now:()=>u,setInterval:()=>y,setTimeout:()=>b,whenTimersIdle:()=>k})},9152(e,t,a){var n=a(7876),i=a(9524);let r=e=>String(e).padStart(2,"0");function l(e){return e>=1e6?`${(e/1e6).toFixed(e>=1e7?0:1).replace(/\.0$/,"")}M`:e>=1e4?`${(e/1e3).toFixed(1).replace(/\.0$/,"")}K`:e.toLocaleString("en-US")}function s(e){let t=Math.max(0,(0,n.O)((0,i.now)(),new Date(e)));return`${Math.floor(t/3600)}:${r(Math.floor(t%3600/60))}:${r(t%60)}`}function o(e,t,a){return e.replace("{width}x{height}",`${t}x${a}`)}a.d(t,{EB:()=>o,Ro:()=>l,xU:()=>s})},643(e,t,a){var n=a(6031),i=a.n(n);let r={"viewers.count":"{count, number} {count, plural, one {viewer} other {viewers}}","viewers.live":"{count, number} watching now","followers.count":"{count, number} {count, plural, one {follower} other {followers}}","about.title":"About {name}","nav.forYou":"For You","nav.recommended":"Recommended Channels","nav.showMore":"Show More","nav.showLess":"Show Less","nav.collapse":"Collapse Side Nav","nav.expand":"Expand Side Nav","nav.browse":"Browse","nav.login":"Log In","nav.signup":"Sign Up","nav.search":"Search","channel.follow":"Follow","channel.subscribe":"Subscribe","channel.gift":"Gift a Sub","channel.live":"LIVE","channel.offline":"OFFLINE","channel.title":"{name} - StreamingSite","player.loading":"Loading","player.play":"Play","player.pause":"Pause","player.mute":"Mute","player.volume":"Volume","player.settings":"Settings","player.theatre":"Theatre Mode","player.fullscreen":"Fullscreen","player.clip":"Clip","home.title":"StreamingSite - Live streams","home.shelf.live":"Live channels we think you'll like","home.shelf.categories":"Categories we think you'll like","home.viewersOnCategory":"{count, number} {count, plural, one {viewer} other {viewers}}","signup.banner":"Sign up to experience the best of {name}. Chat, follow or subscribe."},l=new Map;function s(e,t){let a=l.get(e);return a||(a=new(i())(r[e],"en-US"),l.set(e,a)),a.format(t)}a.d(t,{t:()=>s})},5437(e,t,a){a.d(t,{},{Z:{logo:"M3 2h14v10l-4 4h-3l-3 3V16H3V2zm2 2v10h3v2l2-2h3l3-3V4H5zm4 2h2v5H9V6zm4 0h2v5h-2V6z",menu:"M10 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z",search:"M13.2 12.2l4.4 4.4-1 1-4.4-4.4a6 6 0 111-1zM8.5 3.5a5 5 0 100 10 5 5 0 000-10z",user:"M10 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zM3 16c0-3 3-5 7-5s7 2 7 5v2H3v-2z",inbox:"M2 4h16v10h-4l-1 2H7l-1-2H2V4zm2 2v6h3l1 2h4l1-2h3V6H4z",collapse:"M8 4l1.4 1.4L5.8 9H17v2H5.8l3.6 3.6L8 16l-6-6 6-6zM18 4v12h-2V4h2z",expand:"M12 4l-1.4 1.4L14.2 9H3v2h11.2l-3.6 3.6L12 16l6-6-6-6zM2 4v12h2V4H2z",heart:"M10 17l-1.2-1C4.600 12.200 2 9.900 2 7a4 4 0 014-4c1.600 0 3 .8 4 2 1-1.200 2.400-2 4-2a4 4 0 014 4c0 2.900-2.600 5.200-6.800 9L10 17z",star:"M10 2l2.400 5 5.600.8-4 3.900 1 5.600-5-2.700-5 2.700 1-5.600-4-3.900L7.600 7 10 2z",gift:"M3 7h14v3h-1v7H4v-7H3V7zm2 3v5h4v-5H5zm6 0v5h4v-5h-4zM9 3c1 0 1.500.5 2 1.500C11.500 3.500 12 3 13 3a2 2 0 010 4h-6a2 2 0 010-4h2z",chevronDown:"M14.800 7.200L16 8.400l-6 6-6-6 1.200-1.200L10 12l4.800-4.800z",play:"M5 17V3l12 7-12 7z",pause:"M5 3h3v14H5V3zm7 0h3v14h-3V3z",volume:"M3 7h3l5-4v14l-5-4H3V7zm10.500-1.500A6 6 0 0116 10a6 6 0 01-2.500 4.500l-1-1.500A4 4 0 0014 10a4 4 0 00-1.500-3l1-1.500z",mute:"M3 7h3l5-4v14l-5-4H3V7zm10 .5L14.500 6 16 7.500 17.500 6 19 7.500 17.500 9 19 10.500 17.500 12 16 10.500 14.500 12 13 10.500 14.500 9 13 7.500z",settings:"M10 7a3 3 0 110 6 3 3 0 010-6zm-1-5h2l.5 2.300 1.600.9 2.200-.8 1 1.700-1.700 1.600v1.800l1.700 1.600-1 1.700-2.200-.8-1.600.9L11 18H9l-.5-2.300-1.600-.9-2.200.8-1-1.700L5.400 12.300V10.500L3.700 8.900l1-1.700 2.200.8 1.600-.9L9 2z",theatre:"M2 4h16v12H2V4zm2 2v8h7V6H4zm9 0v8h3V6h-3z",fullscreen:"M3 3h5v2H5v3H3V3zm9 0h5v5h-2V5h-3V3zM3 12h2v3h3v2H3v-5zm12 0h2v5h-5v-2h3v-3z",clip:"M3 4h14v12H3V4zm2 2v8h10V6H5zm2 1.500l5 2.500-5 2.500v-5z",share:"M10 2l4 4-1.400 1.400L11 5.800V13H9V5.800L7.400 7.400 6 6l4-4zM4 10h2v6h8v-6h2v8H4v-8z",bell:"M10 2c3 0 5 2 5 5v3l2 3v1H3v-1l2-3V7c0-3 2-5 5-5zm-2 14h4a2 2 0 01-4 0z",close:"M16.500 4.900L11.400 10l5.100 5.100-1.400 1.400L10 11.400l-5.100 5.100-1.400-1.400L8.600 10 3.500 4.900l1.400-1.400L10 8.600l5.100-5.100 1.400 1.400z",verified:"M10 2l2 1.600 2.500-.2.9 2.400 2.100 1.400-.7 2.400.7 2.400-2.100 1.400-.9 2.400-2.500-.2L10 18l-2-1.600-2.500.2-.9-2.400L2.500 12.800l.7-2.400-.7-2.400 2.100-1.400.9-2.400 2.500.2L10 2zm-1 9.500L7 9.500 5.900 10.600 9 13.700l5.100-5.100L13 7.500l-4 4z",person:"M10 3a3 3 0 110 6 3 3 0 010-6zm0 8c3.500 0 6 1.500 6 4v2H4v-2c0-2.500 2.500-4 6-4z",crown:"M3 6l3.500 3L10 4l3.500 5L17 6l-1 9H4L3 6z",gamepad:"M5 6h10a4 4 0 014 4v2a3 3 0 01-5 2l-1-1H7l-1 1a3 3 0 01-5-2v-2a4 4 0 014-4zm1 2v1H5v2h1v1h2v-1h1V9H8V8H6zm7 1a1 1 0 100 2 1 1 0 000-2z"}})},9391(e,t,a){var n=a(4848),i=a(6540),r=a(6477),l=a(6942),s=a.n(l);let o=new Set(["display","flexDirection","flexWrap","flexGrow","flexShrink","flexBasis","alignItems","alignSelf","justifyContent","position","padding","margin","fullWidth","fullHeight","width","height","minWidth","background","color","borderRadius","border","overflow","zIndex","textAlign","gap","elevation","ellipsis","attachTop","attachLeft","attachRight","attachBottom"]),d=e=>`${.5*e}rem`,c={base:"var(--color-background-base)",alt:"var(--color-background-alt)","alt-2":"var(--color-background-alt-2)","button-primary":"var(--color-background-button-primary-default)","button-secondary":"var(--color-background-button-secondary-default)","text-base":"var(--color-text-base)","text-alt":"var(--color-text-alt)","text-alt-2":"var(--color-text-alt-2)",live:"var(--color-fill-live)",accent:"var(--color-text-link)","text-link":"var(--color-text-link)",overlay:"var(--color-background-overlay)"},h=e=>c[e]??e;function u(e,t){if(void 0===t)return"";if("number"==typeof t)return`${e}:${d(t)};`;let a=t.top??t.y??0,n=t.right??t.x??0,i=t.bottom??t.y??0,r=t.left??t.x??0;return`${e}:${d(a)} ${d(n)} ${d(i)} ${d(r)};`}let m=(0,r.AH)`
  ${e=>e.position&&`position:${e.position};`}
  ${e=>e.display&&`display:${e.display};`}
  ${e=>e.flexDirection&&`flex-direction:${e.flexDirection};`}
  ${e=>e.flexWrap&&`flex-wrap:${e.flexWrap};`}
  ${e=>void 0!==e.flexGrow&&`flex-grow:${e.flexGrow};`}
  ${e=>void 0!==e.flexShrink&&`flex-shrink:${e.flexShrink};`}
  ${e=>e.flexBasis&&`flex-basis:${e.flexBasis};`}
  ${e=>e.alignItems&&`align-items:${e.alignItems};`}
  ${e=>e.alignSelf&&`align-self:${e.alignSelf};`}
  ${e=>e.justifyContent&&`justify-content:${e.justifyContent};`}
  ${e=>u("padding",e.padding)}
  ${e=>u("margin",e.margin)}
  ${e=>e.fullWidth&&"width:100%;"}
  ${e=>e.fullHeight&&"height:100%;"}
  ${e=>e.width&&`width:${e.width};`}
  ${e=>e.height&&`height:${e.height};`}
  ${e=>e.minWidth&&`min-width:${e.minWidth};`}
  ${e=>e.background&&`background-color:${h(e.background)};`}
  ${e=>e.color&&`color:${h(e.color)};`}
  ${e=>e.borderRadius&&`border-radius:${"rounded"===e.borderRadius?"0.4rem":"large"===e.borderRadius?"0.6rem":"full"===e.borderRadius?"9000px":e.borderRadius};`}
  ${e=>e.border&&`border:${e.border};`}
  ${e=>e.overflow&&`overflow:${e.overflow};`}
  ${e=>void 0!==e.zIndex&&`z-index:${e.zIndex};`}
  ${e=>e.textAlign&&`text-align:${e.textAlign};`}
  ${e=>void 0!==e.gap&&`gap:${d(e.gap)};`}
  ${e=>e.elevation&&`box-shadow:0 ${e.elevation}px ${4*e.elevation}px rgba(0,0,0,0.${Math.min(9,2+e.elevation)});`}
  ${e=>e.ellipsis&&"overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"}
  ${e=>e.attachTop&&"border-top-left-radius:0;border-top-right-radius:0;"}
  ${e=>e.attachBottom&&"border-bottom-left-radius:0;border-bottom-right-radius:0;"}
  ${e=>e.attachLeft&&"border-top-left-radius:0;border-bottom-left-radius:0;"}
  ${e=>e.attachRight&&"border-top-right-radius:0;border-bottom-right-radius:0;"}
`,p=r.Ay.div.withConfig({shouldForwardProp:e=>!o.has(e)})`
  ${m}
`,g=(0,r.Ay)(({className:e,children:t})=>(0,i.cloneElement)(t,{className:s()(t.props.className,e)})).withConfig({shouldForwardProp:e=>"className"===e||"children"===e})`
  ${m}
`;function f({children:e,...t}){return(0,n.jsx)(g,{...t,children:i.Children.only(e)})}let x={1:"1.2rem",2:"1.2rem",3:"1.3rem",4:"1.4rem",5:"1.8rem",6:"2rem",7:"2.4rem",8:"3.6rem"},v=new Set([...o,"fontSize","bold","lines","transform"]),b=r.Ay.p.withConfig({shouldForwardProp:e=>!v.has(e)})`
  font-family: var(--font-base);
  font-size: ${e=>x[e.fontSize??4]};
  ${e=>e.bold&&"font-weight:600;"}
  ${e=>e.transform&&`text-transform:${e.transform};`}
  ${e=>e.lines&&`display:-webkit-box;-webkit-line-clamp:${e.lines};-webkit-box-orient:vertical;overflow:hidden;`}
  ${m}
`,w={primary:{bg:"var(--color-background-button-primary-default)",fg:"var(--color-text-button-primary)",hover:"var(--color-background-button-primary-hover)"},secondary:{bg:"var(--color-background-button-secondary-default)",fg:"var(--color-text-button-secondary)",hover:"var(--color-background-button-secondary-hover)"},text:{bg:"transparent",fg:"var(--color-text-button-text)",hover:"var(--color-background-button-text-hover)"},overlay:{bg:"var(--color-background-button-overlay-default)",fg:"#fff",hover:"var(--color-background-button-overlay-hover)"},alert:{bg:"var(--color-background-button-alert-default)",fg:"#fff",hover:"var(--color-background-button-alert-hover)"}},y=r.Ay.button.withConfig({shouldForwardProp:e=>!["appearance","size","icon","fullWidth","active"].includes(e)})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  cursor: pointer;
  font-family: var(--font-base);
  font-weight: 600;
  white-space: nowrap;
  border-radius: var(--border-radius-medium);
  user-select: none;
  ${e=>{let t=w[e.appearance??"secondary"];return`background-color:${t.bg};color:${t.fg};`}}
  ${e=>{let t=e.size??"default",a="small"===t?"2rem":"large"===t?"4rem":"3rem";return e.icon?`width:${a};height:${a};padding:0;`:`height:${a};padding:0 ${"small"===t?"0.8rem":"1rem"};font-size:${"small"===t?"1.2rem":"1.3rem"};`}}
  ${e=>e.fullWidth&&"width:100%;"}
  &:hover {
    background-color: ${e=>w[e.appearance??"secondary"].hover};
  }
  ${e=>e.active&&"box-shadow: inset 0 0 0 2px var(--color-border-brand);"}
`,j=r.Ay.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;function $({children:e,label:t,...a}){return(0,n.jsx)(f,{flexShrink:0,children:(0,n.jsx)(y,{icon:!0,"aria-label":t,...a,children:(0,n.jsx)(j,{children:e})})})}let S=r.Ay.div`
  display: inline-flex;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  fill: ${e=>e.fill??"currentColor"};
  svg {
    width: 100%;
    height: 100%;
  }
`;function N({path:e,size:t=20,fill:a,viewBox:i="0 0 20 20"}){let r=Array.isArray(e)?e:[e];return(0,n.jsx)(S,{size:t,fill:a,className:"tw-svg",children:(0,n.jsx)("svg",{className:"tw-icon__svg",viewBox:i,width:"100%",height:"100%","aria-hidden":"true",focusable:"false",children:r.map((e,t)=>(0,n.jsx)("path",{d:e,fillRule:"evenodd",clipRule:"evenodd"},t))})})}let E=r.Ay.img`
  display: block;
  max-width: 100%;
`,P=r.Ay.div`
  position: relative;
  flex-shrink: 0;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  border-radius: 9000px;
  overflow: hidden;
  background: var(--color-background-alt-2);
`;function z({src:e,size:t=30,alt:a}){return(0,n.jsx)(P,{size:t,className:"tw-avatar",children:(0,n.jsx)(E,{className:"tw-image-avatar",src:e,alt:a,width:t,height:t})})}let k=r.Ay.div`
  position: fixed;
  z-index: 9999;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background: var(--color-background-tooltip);
  color: var(--color-text-tooltip);
  font-size: 1.3rem;
`;function C({label:e,shown:t}){return t?(0,n.jsx)(k,{role:"tooltip",children:e}):null}function L({label:e,children:t}){let[a,r]=(0,i.useState)(!1);return(0,i.isValidElement)(t)?(0,n.jsxs)(n.Fragment,{children:[(0,i.cloneElement)(t,{onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1)}),(0,n.jsx)(C,{label:e,shown:a})]}):t}function _({children:e,fontSize:t=4,...a}){return(0,n.jsx)(p,{children:(0,n.jsx)(b,{fontSize:t,...a,children:(0,n.jsx)("span",{children:e})})})}function I({path:e,label:t,appearance:a="text",size:i=20,onClick:r,target:l}){return(0,n.jsx)(p,{display:"flex",alignItems:"center",children:(0,n.jsx)(L,{label:t,children:(0,n.jsx)($,{appearance:a,label:t,onClick:r,"data-a-target":l,children:(0,n.jsx)(N,{path:e,size:i})})})})}r.Ay.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`,a.d(t,{Ah:()=>N,K0:()=>I,Sl:()=>f,VJ:()=>_,a2:()=>$,eu:()=>z,m_:()=>L},{L_:E,Ni:b,PE:p,SS:y})},9765(e,t,a){var n=a(7874),i=a(1265),r=a(4319);let l=(0,n.HY)({session:function(e={login:null,displayName:null},t){return e},chatSettings:function(e={showTimestamps:!1,highContrastUsernames:!1,animatedEmotes:!0,theme:"dark"},t){return e},chatRoom:function(e={pauseSetting:"mouseover",isPaused:!1,pauseCount:0,replyTargetId:null},t){switch(t.type){case"chat/pausedChanged":return{...e,isPaused:t.isPaused,pauseCount:e.pauseCount+ +!!t.isPaused};case"chat/replyTargetSet":return{...e,replyTargetId:t.id};default:return e}},ui:r.ui});function s(){return(0,n.y$)(l,(0,n.Tw)(i.A))}a.d(t,{pq:()=>s},{QX:e=>({type:"chat/replyTargetSet",id:e})})},4319(e,t,a){var n=a(1932);let i={sideNavCollapsed:!1,recommendedExpanded:!1};function r(e=i,t){return(0,n.jM)(e,e=>{switch(t.type){case"ui/toggleSideNav":e.sideNavCollapsed=!e.sideNavCollapsed;break;case"ui/toggleRecommendedExpanded":e.recommendedExpanded=!e.recommendedExpanded}})}a.d(t,{ui:()=>r},{Z:()=>({type:"ui/toggleRecommendedExpanded"}),n:()=>({type:"ui/toggleSideNav"})})},625(e,t,a){var n=a(9524),i=a(1358),r=a(713),l=a(4113);let s=!new URLSearchParams(location.search).has("realtime");function o(e){for(let t of(s&&(0,n.enableVirtualTime)(),e.rooms))(0,i.P3)(t);window.ssrWorkload={nextEvent:l.s,async playTimeline(t){let a=e.steps.find(e=>e.name===t);if(!a)throw Error(`unknown step ${t}`);let l=e.frames[t];l&&(0,i.Ht)(a.channel,l),(0,n.isVirtualTime)()?await (0,n.advance)(a.durationMs):await new Promise(e=>window.setTimeout(e,a.durationMs)),await (0,r.bA)()}}}a.d(t,{b:()=>o},{x:s})},4113(e,t,a){function n(e,t){window.dispatchEvent(new CustomEvent(`ssr-${e}`,{detail:{targetId:t}}))}function i(e,t){if(!t)return new Promise(t=>window.addEventListener(e,()=>t(),{once:!0}));let a=new Set(t);return new Promise(t=>{let n=i=>{a.delete(i.detail?.targetId??""),a.size||(window.removeEventListener(e,n),t())};window.addEventListener(e,n)})}a.d(t,{W:()=>n,s:()=>i})},379(){},404(e){e.exports=JSON.parse('{"BM":{"lumenfall":{"roomId":"431872590","profile":"en","roomState":{"followers-only":"10","slow":"0"}}},"Ci":[{"name":"LoadChannel","channel":"lumenfall","durationMs":1000,"rate":0,"mix":null},{"name":"ChatFill","channel":"lumenfall","durationMs":3000,"rate":50,"mix":"typical"},{"name":"ChatBurst","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"emotes-moderation"},{"name":"PauseChat","channel":"lumenfall","durationMs":200,"rate":0,"mix":null},{"name":"ChatWhilePaused","channel":"lumenfall","durationMs":1000,"rate":50,"mix":"typical"},{"name":"ResumeChat","channel":"lumenfall","durationMs":200,"rate":0,"mix":null}]}')}},function(e){e.O(0,[190,474],function(){return e(e.s=5557)}),e.O()}]);
//# sourceMappingURL=core-41d79ae5c1ce2b23.js.map