---
title: "Automated article summary generation"
description: "Background"
date: "2019-08-12T05:49:05.444Z"
categories: []
published: false
---

![Photo by [Flipboard](https://unsplash.com/@flipboard?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](./asset-1.jpeg)

#### Background



We have implemented two methods for extractive Bengali text summarizer. One is summarizer using TF(Term frequency) Aonother one is summarizar using TF\_IDF(Term frequency & Inverse Document Frequency).

#### Dataset Preparation

(i) At first, we have prepared a data set of Bengali words around 80–90k words along with their parts of speech which is in dictionary.json file.

(ii) We have a punctuation.txt file which contains all the punctuation of Bengali words.

(iii) We have also a list of stop words in stopwords.txt file.

#### Procedure

(i) At first we have pre-processed the input article. The pre processing steps are :

```
1.We have tokenized the sentences of the article.

2.Then we have tokenized the words of each sentences.

3.Then punctuation and stop words are removed from the tokenized words of each sentence.

4. We then pass each word to the POS(Parts of Speech) tagger and we also
written some additional special pos tagging for more acuracy of the POS tagger.

5.Then we have tried to replace pronoun with their corresponding noun. This time
we have considered only ['তিনি', 'ইনি', 'উনি', 'সে', 'তার', 'তাকে', 'তাহার', 'তাহাকে']
these pronouns to replace. This can be improved by adding more pronouns for
replacing with their corresponding noun.

6.We have made a Bengali stemmer for verbal inflections. Stemmer is needed to
recognize the same word with different inflections for frequency count of each word in
the article. In future noun inflections are needed to be added for more accuracy.
(We have first pass each word in the dictionary. If is is not found there, then we pass
it in the stemmer and return the main word without inflection and if it is not found in
stemmer then we keep the original article word)
```

(ii) After pre-processing is done we have made frequency count of each word in the article. We have implemented two methods. One is TF and another one is TF\_IDF. The frequency count methods for the two processes are described in the above given papers. Here, frequency of cue words and title words of the the article are given more importance.

(iii) Then scores of each sentence is counted summing up the frequency count of each word in each sentence.

(iv) K-means clustering is added based on the scores of each sentence and each sentence is assigned to a cluster . Here clustering is used to separate same type of sentences to remain together based on the scores of each sentences.We have taken 20% sentences from the main article for the summary. If the number of sentences in the summary are greater than 4 then we have used two clusters otherwise 1 cluster is used. Then we have taken the top sentences from each cluster for the summary. The selected sentences are then sorted according to their original sequences in the article.

(v) Finally, we have removed unnecessary conjunction from the beginning of each sentence. Then, we have beautified each sentence of the summarizar.

The above summary generation is extractive methods. In future, we have a plan to make an abstractive text summarizar.

#### Reference

\[1\] [An Improved Extractive Summarization Technique for Bengali Text(s)](https://ieeexplore.ieee.org/document/8465609)

\[2\] [An Extractive Text Summarization Technique for Bengali Document(s) using K-means Clustering Algorithm](https://ieeexplore.ieee.org/document/7890883)

\[3\] [An Innovative Approach of Bangla Text Summarization by Introducing Pronoun Replacement and Improved Sentence Ranking](http://jips-k.org/q.jips?cp=pp&pn=480)



#### Resource

\[1\]
