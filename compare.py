#!/usr/bin/env python3
import csv
import statistics

def load_csv(file_path):
    data = []
    with open(file_path) as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            data.append(dict(zip(header, row)))
    return data

def compare_steps(file1, file2):
    data1 = load_csv(file1)
    data2 = load_csv(file2)
    assert len(data1) == len(data2), "Number of steps should be the same"
    for i in range(len(data1)):
        assert data1[i]['Step'] == data2[i]['Step'], "Steps should be the same"
    for i in range(len(data1)):
        step = data1[i]['Step']
        values1 = [float(d) for d in list(data1[i].values())[1:]]
        values2 = [float(d) for d in list(data2[i].values())[1:]]
        diff = [j-i for i, j in zip(values1, values2)]
        avg1 = statistics.mean(values1)#sum(values1) / len(values1)
        avg2 = statistics.mean(values2)#sum(values2) / len(values2)
        stddev1 = round(statistics.stdev(values1), 2)
        stddev2 = round(statistics.stdev(values2), 2)
        stddev_diff = statistics.stdev(diff)
        mean_diff = statistics.mean(diff)
        print(f"{step:40}: {f'{round(avg1, 2)}±{stddev1}':12} {round(avg2, 2)}±{stddev2} {round(mean_diff - stddev_diff, 2)}..{round(mean_diff + stddev_diff, 2)} ")
        
        #if avg1 > avg2:
        #    print(f"{step}: {file1} is faster")
        #elif avg1 < avg2:
        #    print(f"{step}: {file2} is faster")
        #else:
        #    print(f"{step}: Both files have the same average")

import sys
if len(sys.argv) < 3:
    print("Usage: python program.py file1.csv file2.csv")
    exit()
file1 = sys.argv[1]
file2 = sys.argv[2]
compare_steps(file1, file2)
